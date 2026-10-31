<style id="r141-css">
/* ============ R141 · FABRICA AT PARITY WITH GITHUB ============
   The owner's words (20 October 2026): "I want the Fabrica page to have full parity with GitHub and ALL of its functions."
   And from the list of next steps: "Implement a version comparison tool to help users understand changes between app
   versions."
   Nine views beside Fabrica's own five, each a tab of the work: Code (any idea, release or version; a file with its line
   numbers; the README; Blame; one file's history; a search), Issues, Pull requests, Compare, Actions, Projects, Wiki,
   Insights and Settings. They are drawn only with Fabrica's own tokens (--f-*), keys, slabs and springs, so they are
   amethyst here and the Forge's blue in the Forge, by day and by night, without a rule of their own for either. */
#fb .f-views .f-seg{scroll-behavior:smooth;overscroll-behavior-x:contain}
#fb .f-views .f-seg.h-mr{-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 36px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 36px),transparent)}
#fb .f-views .f-seg.h-ml{-webkit-mask-image:linear-gradient(90deg,transparent,#000 36px);mask-image:linear-gradient(90deg,transparent,#000 36px)}
#fb .f-views .f-seg.h-ml.h-mr{-webkit-mask-image:linear-gradient(90deg,transparent,#000 36px,#000 calc(100% - 36px),transparent);mask-image:linear-gradient(90deg,transparent,#000 36px,#000 calc(100% - 36px),transparent)}
#fb .f-work > .h-blk{flex:0 0 auto}
#fb .f-work{container-type:inline-size}
#fb select:focus-visible,#fb [contenteditable]:focus-visible{outline:2px solid var(--f-acc);outline-offset:2px}
#fb .h-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:10px 12px 0}
#fb .h-bar .h-grow{flex:1 1 160px;min-width:0}
#fb .h-bar .h-right{margin-left:auto}
#fb .h-bar select.h-sel{max-width:min(320px,100%)}
#fb .h-sub .f-btn,#fb .h-head .f-btn{font-family:var(--f-sans)}
#fb .h-pick > .f-btn{align-self:end;justify-self:start}
#fb .h-chips.h-all button.h-lab[aria-pressed="false"]{opacity:1}
#fb .h-bar form{display:flex;gap:6px;align-items:center;flex:1 1 220px;min-width:0}
#fb .h-bar form input{flex:1 1 auto;min-width:0}
#fb select.h-sel{font:600 12.5px/1.3 var(--f-sans);padding:6px 28px 6px 11px;border-radius:10px;border:1px solid var(--f-hair);color:var(--f-ink1);box-shadow:var(--f-pill);max-width:100%;min-width:0;cursor:pointer;-webkit-appearance:none;appearance:none;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5l3 3 3-3' fill='none' stroke='%238a8296' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E") right 9px center/12px no-repeat,linear-gradient(var(--f-a),var(--f-b));transition:transform .16s var(--f-spring),box-shadow .16s}
#fb select.h-sel:hover{transform:translateY(-1px);box-shadow:var(--f-pophi)}
#fb select.h-sel option,#fb select.h-sel optgroup{background:var(--f-hi);color:var(--f-ink1)}
#fb input.h-in,#fb input[type="search"]{border-radius:10px;border:1px solid var(--f-hair);background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink1);font:13px/1.4 var(--f-sans);padding:7px 11px;min-width:0}
#fb input[type="color"].h-col-in{width:38px;height:30px;padding:2px;border-radius:9px;border:1px solid var(--f-hair);background:var(--f-wellbg);box-shadow:var(--f-well);cursor:pointer;flex:0 0 auto}
#fb .h-pad{padding:10px 12px}
#fb .h-crumbs{display:flex;flex-wrap:wrap;align-items:center;gap:1px;font:600 12.5px var(--f-mono);padding:10px 12px 0;color:var(--f-ink3);min-width:0}
#fb .h-crumbs button{border:0;background:transparent;color:var(--f-acc);cursor:pointer;padding:2px 5px;border-radius:6px;font:inherit;transition:background .15s}
#fb .h-crumbs button:hover{background:var(--f-accs)}
#fb .h-crumbs b{color:var(--f-ink1);padding:2px 5px;overflow-wrap:anywhere}
#fb .h-line{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 12px 0;padding:8px 12px;border-radius:12px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);font-size:12.5px;color:var(--f-ink2)}
#fb .h-line b{color:var(--f-ink1);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:46ch}
#fb .h-line .h-right{margin-left:auto}
#fb .h-id{font:600 11px var(--f-mono);padding:1px 6px;border-radius:5px;background:var(--f-wellbg);box-shadow:var(--f-well);color:var(--f-ink2)}
#fb .h-head{display:flex;align-items:flex-start;gap:8px 10px;flex-wrap:wrap;padding:12px 12px 4px}
#fb .h-head h3{font:600 18px/1.3 var(--f-serif);margin:0;flex:1 1 220px;min-width:0;overflow-wrap:anywhere;color:var(--f-ink1)}
#fb .h-head h3 em{font-style:normal;color:var(--f-ink3);font-weight:500}
#fb .h-meta{font-size:12px;color:var(--f-ink3);display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;padding:0 12px 8px}
#fb .h-state{display:inline-flex;align-items:center;gap:6px;font:700 12px/1 var(--f-sans);border-radius:999px;padding:6px 12px;color:#fff;white-space:nowrap;box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 2px 0 rgba(0,0,0,.18),0 4px 8px rgba(40,22,68,.14)}
#fb .h-state svg{width:14px;height:14px}
#fb .h-state.open{background:linear-gradient(#2f8a5c,#246f49)} #fb .h-state.closed,#fb .h-state.merged{background:linear-gradient(#7650c4,#5d37a1)} #fb .h-state.shut{background:linear-gradient(#c04b4b,#a33a3a)}
#fb .h-ic{width:18px;height:18px;flex:0 0 auto;display:block}
#fb .h-ic.open{color:var(--f-ok)} #fb .h-ic.closed,#fb .h-ic.merged{color:var(--f-acc)} #fb .h-ic.shut{color:var(--f-del)}
#fb .h-list{display:flex;flex-direction:column;gap:8px;padding:10px 12px 14px}
#fb .h-item{display:grid;grid-template-columns:20px minmax(0,1fr) auto;gap:3px 10px;align-items:start;text-align:left;width:100%;padding:10px 12px;border-radius:12px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);cursor:pointer;color:var(--f-ink1);font:inherit;
  transition:transform .16s var(--f-spring),box-shadow .16s,border-color .2s;animation:fbRise .35s var(--f-spring) backwards}
#fb .h-item:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .h-item:active{transform:translateY(1px) scale(.99);box-shadow:var(--f-press);transition-duration:.06s}
#fb .h-item .h-ic{margin-top:2px}
#fb .h-item .t{font:600 14px/1.35 var(--f-sans);overflow-wrap:anywhere}
#fb .h-item .m{grid-column:2 / 4;font-size:11.5px;color:var(--f-ink3);display:flex;flex-wrap:wrap;gap:4px 10px;align-items:center}
#fb .h-item .c{font-size:12px;color:var(--f-ink3);white-space:nowrap;display:inline-flex;align-items:center;gap:4px}
#fb .h-item .c svg{width:14px;height:14px}
#fb .h-lab{display:inline-flex;align-items:center;gap:5px;font:600 11.5px/1 var(--f-sans);padding:4px 9px;border-radius:999px;background:var(--lc,#888);color:var(--lt,#fff);border:1px solid rgba(0,0,0,.1);margin:1px 3px 1px 0;white-space:nowrap;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),0 1px 0 rgba(0,0,0,.14);vertical-align:middle}
#fb button.h-lab{cursor:pointer;transition:transform .16s var(--f-spring),opacity .2s,box-shadow .16s}
#fb button.h-lab:hover{transform:translateY(-1px)}
#fb button.h-lab[aria-pressed="false"]{opacity:.5;box-shadow:none}
#fb button.h-lab[aria-pressed="true"]::before{content:"✓";font-size:10px}
#fb .f-seg button[aria-pressed="true"] .n{background:rgba(255,255,255,.22);color:#fff}
#fb .h-chips{display:flex;flex-wrap:wrap;gap:4px;align-items:center;padding:8px 12px 0}
#fb .h-empty-n{color:var(--f-ink3);font-size:12.5px}
#fb .h-tl{position:relative;display:flex;flex-direction:column;gap:12px;padding:6px 12px 12px 34px}
#fb .h-tl::before{content:"";position:absolute;left:20px;top:12px;bottom:12px;width:2px;border-radius:2px;background:var(--f-hair)}
#fb .h-cmt{position:relative;border:1px solid var(--f-hair);border-radius:12px;background:var(--f-hi);box-shadow:var(--f-pop);animation:fbRise .35s var(--f-spring) backwards}
#fb .h-cmt::before{content:"";position:absolute;left:-19px;top:12px;width:10px;height:10px;border-radius:50%;background:var(--f-hi);border:2px solid var(--f-acc)}
#fb .h-cmt.approve{border-color:rgba(47,122,85,.5)} #fb .h-cmt.approve::before{border-color:var(--f-ok);background:var(--f-ok)}
#fb .h-cmt.changes{border-color:rgba(163,58,58,.45)} #fb .h-cmt.changes::before{border-color:var(--f-del);background:var(--f-del)}
#fb .h-cmt-h{display:flex;gap:6px 10px;align-items:center;flex-wrap:wrap;padding:7px 12px;font-size:12px;color:var(--f-ink3);background:linear-gradient(var(--f-a),var(--f-b));border-bottom:1px solid var(--f-hair2);border-radius:12px 12px 0 0}
#fb .h-cmt-h b{color:var(--f-ink1);font-weight:600}
#fb .h-cmt-h .h-right{margin-left:auto}
#fb .h-cmt > .h-md{padding:10px 12px 11px}
#fb .h-ev{position:relative;font-size:12.5px;color:var(--f-ink2);display:flex;gap:6px;align-items:center;flex-wrap:wrap;line-height:1.5}
#fb .h-ev::before{content:"";position:absolute;left:-18px;top:5px;width:8px;height:8px;border-radius:50%;background:var(--f-hi);border:2px solid var(--f-ink3)}
#fb .h-ev.ok::before{border-color:var(--f-ok)} #fb .h-ev.acc::before{border-color:var(--f-acc)} #fb .h-ev.bad::before{border-color:var(--f-del)}
#fb .h-ev small{color:var(--f-ink3)}
#fb .h-ev button.h-link,#fb button.h-link{border:0;background:transparent;color:var(--f-acc);cursor:pointer;font:inherit;padding:0;text-decoration:underline;text-underline-offset:2px}
#fb .h-compose{display:flex;flex-direction:column;gap:8px;padding:6px 12px 12px}
#fb .h-compose textarea{width:100%;min-height:96px;resize:vertical}
#fb .h-compose .h-prev{min-height:96px;border:1px dashed var(--f-hair);border-radius:10px;padding:9px 12px;background:var(--f-hi)}
#fb .h-compose .f-row .f-btn.pri{margin-left:auto}
#fb .h-form{display:flex;flex-direction:column;gap:10px;padding:12px}
#fb .h-form input[type="text"]{width:100%}
#fb .h-form label > span{display:block;font-size:12px;font-weight:600;color:var(--f-ink2);margin-bottom:4px}
#fb .h-sub{font:600 14px/1.3 var(--f-serif);letter-spacing:.03em;margin:14px 12px 4px;color:var(--f-ink1);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#fb .h-sub .f-chip{font-family:var(--f-sans)}
#fb .h-box{margin:10px 12px;padding:12px 14px;border-radius:14px;border:1px solid var(--f-hair);background:var(--f-hi);box-shadow:var(--f-slab);font-size:13px;color:var(--f-ink2);line-height:1.5}
#fb .h-box.ok{border-color:rgba(47,122,85,.45)} #fb .h-box.warn{border-color:rgba(184,116,46,.5);background:linear-gradient(var(--f-warns),var(--f-warns)),var(--f-hi)} #fb .h-box.acc{border-color:var(--f-ring)}
#fb .h-box b.h-big{display:block;font:600 15px/1.35 var(--f-serif);color:var(--f-ink1);margin-bottom:4px}
#fb .h-box .f-row{margin-top:10px}
/* a small Markdown, read safely */
#fb .h-md{font:14px/1.62 var(--f-sans);color:var(--f-ink1);overflow-wrap:anywhere;min-width:0}
#fb .h-md > :first-child{margin-top:0} #fb .h-md > :last-child{margin-bottom:0}
#fb .h-md h1,#fb .h-md h2,#fb .h-md h3,#fb .h-md h4,#fb .h-md h5,#fb .h-md h6{font-family:var(--f-serif);font-weight:600;line-height:1.3;margin:1.1em 0 .5em;color:var(--f-ink1);letter-spacing:.01em}
#fb .h-md h1{font-size:1.6em;border-bottom:1px solid var(--f-hair);padding-bottom:.3em} #fb .h-md h2{font-size:1.32em;border-bottom:1px solid var(--f-hair2);padding-bottom:.25em}
#fb .h-md h3{font-size:1.14em} #fb .h-md h4{font-size:1em} #fb .h-md h5{font-size:.92em} #fb .h-md h6{font-size:.86em;color:var(--f-ink3)}
#fb .h-md p,#fb .h-md ul,#fb .h-md ol,#fb .h-md blockquote,#fb .h-md table,#fb .h-md pre{margin:0 0 .85em}
#fb .h-md ul,#fb .h-md ol{padding-left:1.7em} #fb .h-md li{margin:.15em 0} #fb .h-md li > ul,#fb .h-md li > ol{margin:.15em 0 .2em}
#fb .h-md li.task{list-style:none;margin-left:-1.4em} #fb .h-md li.task input{margin:0 .45em 0 0;vertical-align:-1px}
#fb .h-md code{font:.87em var(--f-mono);background:var(--f-wellbg);border:1px solid var(--f-hair2);padding:.08em .4em;border-radius:5px}
#fb .h-md pre{background:var(--f-code);color:var(--f-codeink);border:1px solid var(--f-hair);border-radius:10px;padding:10px 13px;overflow:auto;box-shadow:var(--f-well);font:12.5px/1.55 var(--f-mono);white-space:pre}
#fb .h-md pre code{background:none;border:0;padding:0;font:inherit}
#fb .h-md blockquote{border-left:3px solid var(--f-ring);padding:.1em 0 .1em 1em;color:var(--f-ink2);margin-left:0}
#fb .h-md table{border-collapse:collapse;display:block;overflow:auto;max-width:100%;font-size:13px}
#fb .h-md th,#fb .h-md td{border:1px solid var(--f-hair);padding:5px 11px}
#fb .h-md th{background:var(--f-wellbg);font-weight:600} #fb .h-md tr:nth-child(2n) td{background:var(--f-hair2)}
#fb .h-md a{color:var(--f-acc);text-decoration:underline;text-underline-offset:2px;cursor:pointer}
#fb .h-md a.h-new{color:var(--f-del);text-decoration-style:dashed}
#fb .h-md a.h-iref{text-decoration:none;font-weight:600}
#fb .h-md hr{border:0;border-top:2px solid var(--f-hair);margin:1.2em 0}
#fb .h-md img{max-width:100%;border-radius:6px}
#fb .h-md .h-alt{font-style:italic;color:var(--f-ink3)}
#fb .h-readme{margin:12px 12px 14px;border:1px solid var(--f-hair);border-radius:14px;background:var(--f-hi);box-shadow:var(--f-slab);overflow:hidden}
#fb .h-readme-h{display:flex;align-items:center;gap:8px;padding:9px 14px;border-bottom:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));font:600 13px var(--f-serif);letter-spacing:.04em}
#fb .h-readme-h span{font:500 12px var(--f-mono);color:var(--f-ink3);margin-left:auto}
#fb .h-readme > .h-md{padding:14px 18px 16px}
#fb .h-readme > pre.h-plain{margin:0;padding:14px 18px;font:12.5px/1.55 var(--f-mono);white-space:pre-wrap;color:var(--f-codeink)}
/* code: the file with its line numbers, a line chosen, a word found */
#fb .h-file{min-height:220px}
#fb .h-file .f-dcode{padding-top:4px}
#fb .f-dl.h-ln i{cursor:pointer}
#fb .f-dl.h-ln i:hover{color:var(--f-acc)}
#fb .f-dl.h-hl{background:var(--f-golds);box-shadow:inset 3px 0 0 var(--f-gold)}
#fb mark.h-mk{background:rgba(202,162,74,.42);color:inherit;border-radius:3px;padding:0 1px}
#fb .h-more{display:flex;justify-content:center;padding:8px}
#fb .h-pic{display:flex;justify-content:center;align-items:center;padding:16px;background:repeating-conic-gradient(var(--f-hair2) 0 25%,transparent 0 50%) 0 0/18px 18px;flex:1 1 auto;min-height:160px}
#fb .h-pic img{max-width:100%;max-height:60vh;border-radius:6px;box-shadow:var(--f-pop)}
#fb .h-about{margin:10px 12px 0;padding:11px 14px;border-radius:14px;border:1px solid var(--f-hair);background:var(--f-hi);box-shadow:var(--f-slab);font-size:13px;color:var(--f-ink2);display:flex;flex-direction:column;gap:6px}
#fb .h-about .h-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
#fb .h-about a{color:var(--f-acc);overflow-wrap:anywhere}
#fb .h-topic{display:inline-flex;font:600 11.5px/1 var(--f-sans);padding:4px 9px;border-radius:999px;background:var(--f-accs);color:var(--f-acc)}
/* blame: who changed each line last */
#fb .h-blame{margin:10px 12px 12px;border:1px solid var(--f-hair);border-radius:12px;background:var(--f-code);box-shadow:var(--f-well);overflow:auto;color:var(--f-codeink)}
#fb .h-bg{display:grid;grid-template-columns:minmax(150px,250px) minmax(0,1fr);border-top:1px solid var(--f-hair2);min-width:520px}
#fb .h-bg:first-child{border-top:0}
#fb .h-bm{position:relative;display:flex;flex-direction:column;gap:1px;align-items:flex-start;text-align:left;padding:4px 10px 4px 14px;font:11.5px/1.4 var(--f-sans);color:var(--f-ink2);border:0;border-right:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));cursor:pointer;min-width:0;transition:background .15s}
#fb .h-bm:hover{background:var(--f-accs)}
#fb .h-bm::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--f-acc);opacity:var(--age,.5)}
#fb .h-bm b{font-weight:600;color:var(--f-ink1);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
#fb .h-bm small{color:var(--f-ink3);font-size:11px}
#fb .h-bm.old{cursor:default}
#fb .h-bl{min-width:0;font:12px/1.6 var(--f-mono);padding:2px 0}
#fb .h-bl .f-dl i{width:48px}
/* search results */
#fb .h-res{margin:0 12px 10px;border:1px solid var(--f-hair);border-radius:12px;background:var(--f-code);box-shadow:var(--f-pop);overflow:hidden}
#fb .h-res-h{display:flex;gap:8px;align-items:center;padding:7px 12px;font:600 12.5px var(--f-mono);background:linear-gradient(var(--f-a),var(--f-b));border-bottom:1px solid var(--f-hair2);color:var(--f-ink1)}
#fb .h-res-h .f-chip{margin-left:auto;font-family:var(--f-sans)}
#fb .h-res-l{display:flex;width:100%;text-align:left;border:0;background:transparent;font:12px/1.65 var(--f-mono);color:var(--f-codeink);padding:1px 12px 1px 0;cursor:pointer;white-space:pre;overflow:hidden;text-overflow:ellipsis;transition:background .12s}
#fb .h-res-l:hover,#fb .h-res-l:focus-visible{background:var(--f-accs)}
#fb .h-res-l i{flex:0 0 auto;width:56px;text-align:right;padding-right:10px;color:var(--f-com);font-style:normal}
#fb .h-res-l span{overflow:hidden;text-overflow:ellipsis}
/* every changed file, line by line */
#fb .h-dblk{margin:0 12px 12px;border:1px solid var(--f-hair);border-radius:12px;background:var(--f-code);box-shadow:var(--f-well);overflow:hidden;scroll-margin-top:8px}
#fb .h-dblk .f-dcode{flex:none;min-height:0;overflow-x:auto;overflow-y:visible;padding:4px 0 8px}
#fb .h-dblk .f-diff-h .f-btn{margin-left:0}
#fb .h-dblk .f-diff-h .h-right{margin-left:auto;display:flex;gap:6px;align-items:center}
#fb .h-dblk .f-diff-h .k{font-size:11px;font-weight:700;padding:1px 8px;border-radius:999px;background:var(--f-golds);color:var(--f-goldink)}
#fb .h-dblk .f-diff-h .k.added{background:var(--f-addbg);color:var(--f-add)} #fb .h-dblk .f-diff-h .k.removed{background:var(--f-delbg);color:var(--f-del)} #fb .h-dblk .f-diff-h .k.moved{background:var(--f-accs);color:var(--f-acc)}
#fb .h-dblk .f-diff-h .a{color:var(--f-add);font:600 11.5px var(--f-mono)} #fb .h-dblk .f-diff-h .r{color:var(--f-del);font:600 11.5px var(--f-mono)}
#fb .h-pick{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:8px;align-items:end;padding:10px 12px 0}
#fb .h-pick label{display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:600;color:var(--f-ink2);min-width:0}
#fb .h-pick select{width:100%}
#fb .h-sum{display:flex;gap:6px;flex-wrap:wrap;padding:10px 12px 0;align-items:center}
#fb .h-vers{display:flex;flex-direction:column;gap:6px;padding:8px 12px 4px}
#fb .h-ver{display:flex;align-items:center;gap:9px;text-align:left;width:100%;padding:7px 11px;border-radius:10px;border:1px solid var(--f-hair2);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);cursor:pointer;font:inherit;font-size:13px;color:var(--f-ink1);transition:transform .16s var(--f-spring),box-shadow .16s}
#fb .h-ver:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .h-ver:active{transform:translateY(1px);box-shadow:var(--f-press)}
#fb .h-ver .t{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .h-ver small{flex:0 0 auto;color:var(--f-ink3);font-size:11.5px}
/* actions: each run and its five checks */
#fb .h-run{margin:0 12px 10px;border:1px solid var(--f-hair);border-radius:12px;background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);animation:fbRise .4s var(--f-spring) backwards}
#fb .h-run > button{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:transparent;padding:10px 13px;cursor:pointer;font:inherit;color:var(--f-ink1)}
#fb .h-run > button .t{flex:1 1 auto;min-width:0}
#fb .h-run > button .t b{display:block;font:600 13.5px/1.35 var(--f-sans);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .h-run > button .t small{display:block;font-size:11.5px;color:var(--f-ink3)}
#fb .h-run .h-dot{width:22px;height:22px;border-radius:7px;display:grid;place-items:center;font-size:12px;font-weight:700;flex:0 0 auto}
#fb .h-run .h-dot.ok{background:var(--f-oks);color:var(--f-ok)} #fb .h-run .h-dot.bad{background:var(--f-delbg);color:var(--f-del)} #fb .h-run .h-dot.none{background:var(--f-warns);color:var(--f-warn)} #fb .h-run .h-dot.run{background:var(--f-accs);color:var(--f-acc)}
#fb .h-run .h-body{padding:0 13px 12px 45px}
#fb .h-run[aria-expanded="true"]{border-color:var(--f-ring)}
/* projects: three columns, cards that move */
#fb .h-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding:12px;align-items:start}
@container (max-width:620px){#fb .h-board{grid-template-columns:minmax(0,1fr)}#fb .h-bg{grid-template-columns:120px minmax(0,1fr);min-width:0}}
#fb .h-colm{border:1px solid var(--f-hair);border-radius:14px;background:var(--f-wellbg);box-shadow:var(--f-well);padding:10px;display:flex;flex-direction:column;gap:8px;min-height:170px;transition:border-color .2s,background .2s}
#fb .h-colm.h-over{border-color:var(--f-ring);background:var(--f-accs)}
#fb .h-colm h4{margin:0 0 2px;font:600 14px/1.3 var(--f-serif);display:flex;align-items:center;gap:8px;color:var(--f-ink1);letter-spacing:.03em}
#fb .h-colm h4 .f-chip{margin-left:auto;font-family:var(--f-sans)}
#fb .h-colm .h-cards{display:flex;flex-direction:column;gap:8px;min-height:40px}
#fb .h-card{position:relative;display:flex;gap:8px;align-items:flex-start;padding:9px 32px 9px 8px;border-radius:11px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop);font-size:13px;line-height:1.4;color:var(--f-ink1);cursor:grab;-webkit-user-select:none;user-select:none;transition:transform .16s var(--f-spring),box-shadow .16s,opacity .2s}
#fb .h-card:hover{transform:translateY(-2px);box-shadow:var(--f-pophi)}
#fb .h-card:focus-visible{outline:2px solid var(--f-acc);outline-offset:2px}
#fb .h-card .h-grip{flex:0 0 auto;width:14px;align-self:stretch;display:grid;place-items:center;color:var(--f-ink3);touch-action:none;cursor:grab;font-size:12px;letter-spacing:-2px}
#fb .h-card .h-cb{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:3px;overflow-wrap:anywhere}
#fb .h-card .h-cb .h-ct{display:flex;gap:6px;align-items:flex-start}
#fb .h-card .h-cb small{color:var(--f-ink3);font-size:11.5px}
#fb .h-card .h-x{position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:7px;border:0;background:transparent;color:var(--f-ink3);cursor:pointer;display:grid;place-items:center;font-size:14px;line-height:1}
#fb .h-card .h-x:hover{background:var(--f-delbg);color:var(--f-del)}
#fb .h-card.h-lift{opacity:.35}
#fb .h-ghost{position:fixed;z-index:60;pointer-events:none;transform:rotate(1.5deg) scale(1.02);box-shadow:var(--f-slabhi);margin:0}
#fb .h-colm .h-add{align-self:flex-start}
/* wiki */
#fb .h-pages{display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px 0}
#fb .h-pages button{font:600 12px var(--f-sans);border-radius:999px;padding:4px 11px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pill);cursor:pointer;color:var(--f-ink2);transition:transform .16s var(--f-spring),box-shadow .16s}
#fb .h-pages button:hover{transform:translateY(-1px);box-shadow:var(--f-pophi)}
#fb .h-pages button[aria-pressed="true"]{color:#fff;background:linear-gradient(var(--f-pa),var(--f-pb));border-color:var(--f-pedge);box-shadow:var(--f-psh)}
#fb .h-wiki{margin:10px 12px 14px;border:1px solid var(--f-hair);border-radius:14px;background:var(--f-hi);box-shadow:var(--f-slab);padding:16px 20px 18px}
#fb .h-wiki > h2{font:600 22px/1.25 var(--f-serif);margin:0 0 10px;letter-spacing:.02em;color:var(--f-ink1)}
#fb .h-revs{display:flex;flex-direction:column;gap:6px;padding:8px 12px}
#fb .h-ver[aria-pressed="true"]{border-color:var(--f-ring);box-shadow:var(--f-pophi),inset 0 0 0 1px var(--f-ring)}
/* insights */
#fb .h-ins{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;padding:10px 12px 4px}
#fb .h-stat{padding:10px 12px;border-radius:12px;border:1px solid var(--f-hair);background:linear-gradient(var(--f-a),var(--f-b));box-shadow:var(--f-pop)}
#fb .h-stat b{display:block;font:600 22px/1.15 var(--f-serif);color:var(--f-ink1);font-variant-numeric:tabular-nums}
#fb .h-stat span{display:block;font-size:12px;color:var(--f-ink3);margin-top:2px}
#fb .h-chart{position:relative;margin:4px 12px 0;padding:22px 6px 0;height:170px;display:flex;align-items:flex-end;gap:2px;border-bottom:1px solid var(--f-hair)}
#fb .h-chart::before,#fb .h-chart::after{content:"";position:absolute;left:0;right:0;height:1px;background:var(--f-hair2)}
#fb .h-chart::before{top:22px} #fb .h-chart::after{top:calc(22px + (100% - 22px) / 2)}
#fb .h-colb{position:relative;flex:1 1 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;cursor:default;outline:none;z-index:1}
#fb .h-colb i{display:block;width:100%;max-width:24px;background:var(--f-acc);border-radius:4px 4px 0 0;transition:filter .15s}
#fb .h-colb:hover i,#fb .h-colb:focus-visible i{filter:brightness(1.15)}
#fb .h-colb:focus-visible{box-shadow:inset 0 0 0 2px var(--f-ring);border-radius:6px}
#fb .h-colb .h-v{position:absolute;font:600 11px var(--f-sans);color:var(--f-ink2);transform:translateY(-16px)}
#fb .h-tip{position:absolute;z-index:3;pointer-events:none;background:var(--f-hi);color:var(--f-ink1);border:1px solid var(--f-hair);border-radius:9px;padding:5px 9px;font-size:12px;white-space:nowrap;box-shadow:var(--f-pophi);transform:translate(-50%,-100%);top:0}
#fb .h-axis{display:flex;gap:2px;margin:4px 12px 0;padding:0 6px;font-size:10.5px;color:var(--f-ink3)}
#fb .h-axis span{flex:1 1 0;text-align:center;min-width:0;white-space:nowrap;overflow:visible}
#fb .h-tbl{margin:8px 12px;border-collapse:collapse;font-size:12.5px;width:calc(100% - 24px)}
#fb .h-tbl th,#fb .h-tbl td{border-bottom:1px solid var(--f-hair2);padding:5px 8px;text-align:left}
#fb .h-tbl td.n,#fb .h-tbl th.n{text-align:right;font-variant-numeric:tabular-nums}
#fb {--h-c1:#2a78d6;--h-c2:#eb6834;--h-c3:#1baf7a;--h-c4:#eda100;--h-c5:#e87ba4;--h-c6:#008300;--h-c7:#6250d6;--h-c8:#e34948;--h-c0:#8a8296}
body[data-theme="night"] #fb{--h-c1:#3987e5;--h-c2:#d95926;--h-c3:#199e70;--h-c4:#c98500;--h-c5:#d55181;--h-c6:#008300;--h-c7:#9085e9;--h-c8:#e66767;--h-c0:#6f6780}
#fb .h-langbar{display:flex;gap:2px;height:10px;margin:8px 12px 6px;border-radius:999px;overflow:hidden;background:var(--f-wellbg)}
#fb .h-langbar i{display:block;height:100%;min-width:3px}
#fb .h-langs{display:flex;flex-wrap:wrap;gap:4px 16px;list-style:none;margin:0;padding:2px 12px 6px;font-size:12.5px;color:var(--f-ink2)}
#fb .h-langs li{display:flex;align-items:center;gap:6px}
#fb .h-langs li i{width:10px;height:10px;border-radius:50%;flex:0 0 auto}
#fb .h-langs li small{color:var(--f-ink3)}
#fb .h-who{display:flex;flex-direction:column;gap:6px;padding:6px 12px}
#fb .h-who > div{display:grid;grid-template-columns:minmax(0,1fr) minmax(60px,2fr) auto;gap:10px;align-items:center;font-size:12.5px}
#fb .h-who b{font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#fb .h-bar1{height:8px;border-radius:0 4px 4px 0;background:var(--f-acc)}
#fb .h-lines{display:flex;flex-direction:column;gap:4px;padding:6px 12px 10px}
#fb .h-lines > div{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:8px;align-items:center;font-size:12px}
#fb .h-lines .t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--f-ink2)}
#fb .h-lines .p,#fb .h-lines .q{display:flex;align-items:center;gap:6px;font:600 11.5px var(--f-mono);min-width:0}
#fb .h-lines .p{color:var(--f-add)} #fb .h-lines .q{color:var(--f-del)}
#fb .h-lines .p i,#fb .h-lines .q i{display:block;height:8px;border-radius:0 4px 4px 0;flex:0 0 auto;min-width:2px}
#fb .h-lines .p i{background:var(--f-add)} #fb .h-lines .q i{background:var(--f-del)}
#fb .h-key{display:flex;gap:14px;padding:4px 12px 0;font-size:12px;color:var(--f-ink2)}
#fb .h-key span{display:inline-flex;align-items:center;gap:6px} #fb .h-key i{width:10px;height:10px;border-radius:3px;display:inline-block}
/* settings */
#fb .h-labrow{display:grid;grid-template-columns:auto minmax(90px,1fr) minmax(0,2fr) auto auto;gap:8px;align-items:center;margin-bottom:8px}
@container (max-width:560px){#fb .h-labrow{grid-template-columns:auto minmax(0,1fr) auto auto}#fb .h-labrow .h-ld{display:none}#fb .h-pick{grid-template-columns:minmax(0,1fr)}}
#fb .h-star[aria-pressed="true"]{color:var(--f-goldink);border-color:rgba(184,138,58,.45)}
#fb .f-repo .h-starmark{position:absolute;top:6px;left:9px;font-size:12px;color:var(--f-gold);text-shadow:0 1px 0 rgba(0,0,0,.15)}
#fb .h-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
#fb .h-note2{margin:10px 12px 0;font-size:12.5px;color:var(--f-ink3);line-height:1.5}
@media (prefers-reduced-motion:reduce){#fb .h-ghost{transform:none}}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p62"]="started";}catch(_){}
/* R141 · FABRICA AT PARITY WITH GITHUB (see the note at the top of its styles for the owner's words).
   window.fbHub.views are the views Fabrica (R112) paints for any view it does not know itself; R112 lends its helpers
   as window.fbHubHost. Everything here works with no connection, in Ingenium and in the Forge's copy of Fabrica (which
   has no Chat, no Code, no Build and no model): anything outside Fabrica is looked for before it is used. Nothing heavy
   runs at start: a view reads what it needs when it is opened, and the larger work (blame, a search, the lines of the
   last twenty versions) only when it is asked for. */
(function r141Hub(){"use strict";
var HUBDB="ingenium_hub";
if(typeof IngRepo==="undefined"||!IngRepo||typeof IngRepo.log!=="function")return;
function $(id){return document.getElementById(id);}
function X(){return window.fbHubHost||null;}
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function T(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function btn(cls,label,on){var b=h("button","f-btn"+(cls?" "+cls:""));b.type="button";b.textContent=label;if(on)b.onclick=on;return b;}
function kb(n){var x=X();if(x&&x.kb)return x.kb(n);n=n||0;if(n<1024)return n+" B";if(n<1048576)return Math.round(n/1024)+" KB";return (n/1048576).toFixed(1)+" MB";}
function when(t){var x=X();if(x&&x.when)return x.when(t);return t?new Date(t).toLocaleString("en-GB"):"";}
function cap(m){m=String(m||"");return m.charAt(0).toUpperCase()+m.slice(1);}
function toast(m){var x=X();try{if(x&&x.toast&&$("fb")){x.toast(m);return;}}catch(e){}try{if(typeof ingToast==="function"){ingToast(m);return;}}catch(e){}try{console.log("Fabrica:",m);}catch(_){}}
function fail(e){var m=e&&e.message?e.message:String(e);toast(cap(m));try{console.warn("Fabrica hub",e);}catch(_){}}
function plural(n,one,many){return n.toLocaleString("en-GB")+" "+(n===1?one:(many||one+"s"));}
function nums(list){list=list.map(function(n){return "#"+n;});return list.length<2?list.join(""):list.slice(0,-1).join(", ")+" and "+list[list.length-1];}
function clone(x){return JSON.parse(JSON.stringify(x));}
function seq(list,fn){var out=[],i=0;function next(){if(i>=list.length)return Promise.resolve(out);var k=i++;
  return Promise.resolve(fn(list[k],k)).then(function(v){out[k]=v;return k%40===39?new Promise(function(res){setTimeout(res,0);}).then(next):next();});}return next();}
/* asked, in the page's own words where it has a way to ask; the Forge has none of Ingenium's, so its own confirm */
function ask(title,text,yes,danger,no){try{if(typeof window.ingAsk==="function")return Promise.resolve(window.ingAsk({title:title,text:text,yes:yes||"Yes",no:no||"Keep it",danger:!!danger}));}catch(e){}
  return Promise.resolve(window.confirm(title+"\n\n"+text));}
function who(){try{var a=IngRepo.author&&IngRepo.author();if(a&&a.name)return a.name;}catch(e){}return "You";}

/* ---------- the store: one record per app, in a database of its own (the Forge's build renames HUBDB) ---------- */
var MEM=null,dbp=null;
function db(){if(dbp)return dbp;dbp=new Promise(function(res,rej){try{if(typeof indexedDB==="undefined")throw new Error("this device keeps no store");var rq=indexedDB.open(HUBDB,1);
    rq.onupgradeneeded=function(){try{rq.result.createObjectStore("apps");}catch(e){}};
    rq.onsuccess=function(){var d=rq.result;d.onversionchange=function(){try{d.close();}catch(e){}dbp=null;};res(d);};
    rq.onerror=function(){rej(rq.error||new Error("this device will not keep Fabrica's issues and pages"));};
    rq.onblocked=function(){rej(new Error("another window holds Fabrica's store open: close it and try again"));};}catch(e){rej(e);}});
  dbp.catch(function(){dbp=null;});return dbp;}
function tx(mode,fn){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("apps",mode),q=fn(t.objectStore("apps"));
  t.oncomplete=function(){res(q&&"result" in q?q.result:undefined);};t.onerror=function(){rej(t.error);};t.onabort=function(){rej(t.error||new Error("this device's storage is full"));};});});}
/* where the device keeps no store at all (a private window), the notes live for this visit only, and the owner is told */
function useMem(e){if(!MEM){MEM={};setTimeout(function(){toast("This window keeps no store, so issues and pages last only until it closes.");},600);try{console.warn("R141: no store",e);}catch(_){}}}
function getRec(id){if(MEM)return Promise.resolve(MEM[id]?clone(MEM[id]):null);
  return tx("readonly",function(s){return s.get(id);}).then(function(x){return x||null;},function(e){useMem(e);return null;});}
function putRec(rec){if(MEM){MEM[rec.id]=clone(rec);return Promise.resolve();}return tx("readwrite",function(s){return s.put(rec,rec.id);});}
function delRec(id){if(MEM){delete MEM[id];return Promise.resolve();}return tx("readwrite",function(s){return s.delete(id);});}
function allRecs(){if(MEM)return Promise.resolve(Object.keys(MEM).map(function(k){return clone(MEM[k]);}));return tx("readonly",function(s){return s.getAll();}).then(function(a){return a||[];});}

var LABELS0=[{name:"bug",color:"#d73a4a",desc:"Something does not work"},{name:"enhancement",color:"#a2eeef",desc:"Something new, or something better"},
  {name:"documentation",color:"#0075ca",desc:"The guide, the notes, the README"},{name:"question",color:"#d876e3",desc:"Something to find out"},{name:"idea",color:"#7057ff",desc:"A thought to try one day"}];
function fresh(id){return {id:id,v:1,next:1,issues:[],pulls:[],labels:clone(LABELS0),runs:[],runN:0,auto:false,board:{todo:[],doing:[],done:[],notes:{}},wiki:{pages:{}},
  about:{desc:"",site:"",topics:[]},star:false,seen:{},forkOf:null,from:null,defBranch:"",made:Date.now(),changed:Date.now()};}
function norm(x,id){var f=fresh(id||(x&&x.id));if(!x||typeof x!=="object")return f;
  Object.keys(f).forEach(function(k){if(x[k]===undefined||(f[k]!==null&&x[k]!==null&&typeof x[k]!==typeof f[k]))x[k]=f[k];});
  ["issues","pulls","labels","runs"].forEach(function(k){if(!Array.isArray(x[k]))x[k]=f[k];});
  if(!x.board||typeof x.board!=="object")x.board=f.board;["todo","doing","done"].forEach(function(k){if(!Array.isArray(x.board[k]))x.board[k]=[];});if(!x.board.notes||typeof x.board.notes!=="object")x.board.notes={};
  if(!x.wiki||typeof x.wiki!=="object"||!x.wiki.pages||typeof x.wiki.pages!=="object")x.wiki={pages:{}};
  if(!x.about||typeof x.about!=="object")x.about=f.about;if(!Array.isArray(x.about.topics))x.about.topics=[];
  if(!x.seen||typeof x.seen!=="object")x.seen={};
  x.issues.concat(x.pulls).forEach(function(i){["comments","events","labels","refs"].forEach(function(k){if(!Array.isArray(i[k]))i[k]=[];});});
  var mx=0;x.issues.concat(x.pulls).forEach(function(i){if(i.n>mx)mx=i.n;});if(!(x.next>mx))x.next=mx+1;x.id=id||x.id;return x;}
var REC={},RECP={},RECERR={},SAVEQ={};
/* the record of an app, if it is read already; otherwise it is read now and the view painted again */
function recOf(r){if(REC[r.id])return REC[r.id];if(!RECP[r.id]&&!RECERR[r.id]){RECP[r.id]=recP(r.id).then(function(){delete RECP[r.id];repaint();},function(e){delete RECP[r.id];RECERR[r.id]=e;repaint();});}return null;}
function recP(id){if(REC[id])return Promise.resolve(REC[id]);return getRec(id).then(function(x){if(!REC[id])REC[id]=norm(x||fresh(id),id);return REC[id];});}
function keep(rec){rec.changed=Date.now();REC[rec.id]=rec;badges(rec);var job=(SAVEQ[rec.id]||Promise.resolve()).then(function(){return putRec(rec);});SAVEQ[rec.id]=job.catch(function(){});
  return job.catch(function(e){fail(new Error("this could not be kept on the device ("+(e&&e.message||e)+")"));throw e;});}
function forget(id){delete REC[id];delete VS[id];var st=hs();var i=st.stars.indexOf(id);if(i>=0){st.stars.splice(i,1);stSave();}return delRec(id).catch(function(){});}

/* ---------- small settings kept with the page's own: the stars (Your apps puts them first, before any store is read) ---------- */
var MEMST={};
function ST(){try{if(typeof window.__fbState==="function")return window.__fbState();}catch(e){}try{if(typeof state==="object"&&state)return state;}catch(e){}return MEMST;}
function stSave(){try{if(typeof window.__fbSave==="function"){window.__fbSave();return;}}catch(e){}try{if(typeof saveState==="function")saveState();}catch(e){}}
function hs(){var s=ST();if(!s.v61||typeof s.v61!=="object")s.v61={};var v=s.v61;if(!v.hub||typeof v.hub!=="object")v.hub={};if(!Array.isArray(v.hub.stars))v.hub.stars=[];return v.hub;}

/* ---------- reading git: a version's files without flattening its whole tree ---------- */
function store(){return IngRepo.core.store();}
function blob(oid){return store().need(oid,"blob").then(function(o){return o.body;});}
function isBin(u8){var n=Math.min(u8.length,8000);for(var i=0;i<n;i++)if(u8[i]===0)return true;return false;}
var BIN=/\.(png|jpe?g|gif|webp|ico|bmp|woff2?|ttf|otf|eot|pdf|zip|gz|tgz|wasm|mp3|mp4|m4a|ogg|wav|webm|mov|avif|jks|keystore|p12|pfx|apk|ipa|aab|dex|so|jar|class|bin|dat|bundle|pack|idx)$/i;
var IMG=/\.(png|jpe?g|gif|webp|ico|bmp|avif|svg)$/i;
var TXT=new Map(),TXTN=0;
function textOf(oid){if(TXT.has(oid)){var v=TXT.get(oid);TXT.delete(oid);TXT.set(oid,v);return Promise.resolve(v);}
  return blob(oid).then(function(b){var t=isBin(b)?null:new TextDecoder().decode(b);TXT.set(oid,t);TXTN+=t?t.length:0;
    while(TXTN>48e6&&TXT.size>1){var k=TXT.keys().next().value,o=TXT.get(k);TXT.delete(k);TXTN-=o?o.length:0;}return t;});}
function treeOf(oid,by){if(by&&by[oid])return Promise.resolve(by[oid].tree);return store().need(oid,"commit").then(function(o){return IngRepo.core.parseCommit(o.body).tree;});}
function isTree(m){return m==="40000"||m==="040000";}
function blobAt(treeOid,path){var parts=String(path).split("/");
  function walk(t,i){return store().need(t,"tree").then(function(o){var es=IngRepo.core.parseTree(o.body),e=null;for(var k=0;k<es.length;k++)if(es[k].name===parts[i]){e=es[k];break;}
    if(!e)return null;if(i===parts.length-1)return isTree(e.mode)?null:e.oid;return isTree(e.mode)?walk(e.oid,i+1):null;});}
  return walk(treeOid,0);}
function split(t){return IngRepo.core.splitLines(t||"");}
/* which line of the version before each line of this one was, or -1 where it was written here */
function mapLines(a,b){var m=new Int32Array(b.length).fill(-1),rs=IngRepo.core.lineDiff(a,b),ai=0,bi=0;
  rs.forEach(function(r){while(ai<r.a0&&bi<r.b0){m[bi]=ai;ai++;bi++;}ai=r.a1;bi=r.b1;});while(ai<a.length&&bi<b.length){m[bi]=ai;ai++;bi++;}return m;}
function refLabel(ref){ref=String(ref||"");if(ref==="empty")return "the start";if(ref.indexOf("refs/heads/")===0)return ref.slice(11);if(ref.indexOf("refs/tags/")===0)return ref.slice(10);if(/^[0-9a-f]{40}$/.test(ref))return ref.slice(0,7);return ref;}
function isBranchRef(ref){return String(ref||"").indexOf("refs/heads/")===0;}
function defBranch(r,rec){var d=rec&&rec.defBranch;if(d&&r.branches.indexOf(d)>=0)return d;return r.branches.indexOf("main")>=0?"main":(r.branches[0]||r.branch||"main");}
/* every version the app holds (each idea and release), newest first */
function allVersions(r,max){max=max||3000;var tips=r.branches.map(function(b){return "refs/heads/"+b;}).concat(r.tags.map(function(t){return "refs/tags/"+t;}));if(!tips.length&&r.head)tips=[r.head];
  return seq(tips,function(t){return IngRepo.log(r.id,{ref:t,max:max}).catch(function(){return [];});}).then(function(ls){var m={},full=false;ls.forEach(function(l){if(l.length>=max)full=true;l.forEach(function(c){m[c.oid]=c;});});
    var out=Object.keys(m).map(function(k){return m[k];}).sort(function(a,b){return b.when-a.when;});out.full=full;return out;});}
/* the versions in b and not in a, those in a and not in b, and the newest version both share */
function between(r,a,b){return Promise.all([a==="empty"||!a?Promise.resolve([]):IngRepo.log(r.id,{ref:a,max:5000}),IngRepo.log(r.id,{ref:b,max:5000})]).then(function(x){var A={},B={};
  x[0].forEach(function(c){A[c.oid]=c;});x[1].forEach(function(c){B[c.oid]=c;});
  var ahead=x[1].filter(function(c){return !A[c.oid];}),behind=x[0].filter(function(c){return !B[c.oid];}),common=x[1].filter(function(c){return A[c.oid];}),isP={};
  common.forEach(function(c){c.parents.forEach(function(p){isP[p]=1;});});var heads=common.filter(function(c){return !isP[c.oid];});
  return {ahead:ahead,behind:behind,base:heads.length?heads[0].oid:null};});}

/* ---------- a small Markdown, safe: every character of HTML in it is shown as text, never run ---------- */
function safeUrl(u){u=String(u||"").trim();if(!u)return null;var l=u.replace(/[\x00-\x20\x7f]/g,"").toLowerCase();
  if(/^\/\//.test(l))return null;if(/^[a-z][a-z0-9+.-]*:/.test(l)&&!/^(https?|mailto):/.test(l))return null;return u;}
function slug(s){return String(s||"").toLowerCase().replace(/<[^>]*>/g,"").replace(/[^\w\- ]+/g,"").trim().replace(/\s+/g,"-");}
function mdLink(url,html,title,o){var u=safeUrl(url);if(u==null)return html;
  if(u.charAt(0)==="#")return '<a href="'+esc(u)+'" data-anchor="'+esc(slug(decodeURI2(u.slice(1))))+'">'+html+"</a>";
  if(/^(https?:|mailto:)/i.test(u))return '<a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer"'+(title?' title="'+esc(title)+'"':"")+">"+html+"</a>";
  if(o.path){var p=o.path(u);if(p)return '<a href="#" data-path="'+esc(p)+'">'+html+"</a>";}
  return html;}
function decodeURI2(s){try{return decodeURIComponent(s);}catch(e){return s;}}
function mdInline(s,o){o=o||{};var held=[];function hold(x){held.push(x);return "\u0001"+(held.length-1)+"\u0002";}
  s=String(s).replace(/[\u0001\u0002]/g,"");
  s=s.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g,function(m,t,c){if(/^ .* $/.test(c)&&c.trim())c=c.slice(1,-1);return hold("<code>"+esc(c)+"</code>");});
  s=s.replace(/\\([\\`*_{}\[\]()#+\-.!|~<>])/g,function(m,c){return hold(esc(c));});
  if(o.wiki)s=s.replace(/\[\[([^\]\n|]+)(?:\|([^\]\n]+))?\]\]/g,function(m,a,b){var page=(b||a).trim(),text=a.trim();return hold(o.wiki(page,text));});
  /* an address may hold brackets of its own, as javascript:alert(1) or a page about Tide_(clock) does: one pair is read as part of it */
  s=s.replace(/!\[([^\]\n]*)\]\(\s*(?:<([^\s<>]+)>|((?:[^\s()<>]|\([^\s()<>]*\))+))(?:\s+"[^"\n]*")?\s*\)/g,function(m,alt,s1,s2){var src=s1||s2;return hold(o.img?o.img(src,alt):'<span class="h-alt">'+esc(alt||"a picture")+"</span>");});
  if(!o.nolink){
    s=s.replace(/\[((?:[^\[\]\n]|\[[^\]\n]*\])+)\]\(\s*(?:<([^\s<>]+)>|((?:[^\s()<>]|\([^\s()<>]*\))+))(?:\s+"([^"\n]*)")?\s*\)/g,function(m,text,u1,u2,title){var url=u1||u2;var o2={};for(var k in o)o2[k]=o[k];o2.nolink=true;return hold(mdLink(url,mdInline(text,o2),title,o));});
    s=s.replace(/<((?:https?:\/\/|mailto:)[^\s<>]+)>/g,function(m,u){return hold(mdLink(u,esc(u),null,o));});
    s=s.replace(/(^|[\s(])((?:https?:\/\/|www\.)[^\s<]*[^\s<.,:;"')\]!?*_~])/g,function(m,pre,u){return pre+hold(mdLink(/^www\./i.test(u)?"https://"+u:u,esc(u),null,o));});}
  s=esc(s);
  s=s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g,"<strong>$1</strong>").replace(/(^|[^\w])__(?=\S)([\s\S]*?\S)__(?!\w)/g,"$1<strong>$2</strong>");
  s=s.replace(/\*(?=[^\s*])([^*\n]*?[^\s*])\*/g,"<em>$1</em>").replace(/(^|[^\w])_(?=[^\s_])([^_\n]*?[^\s_])_(?!\w)/g,"$1<em>$2</em>");
  s=s.replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>");
  if(o.refs)s=s.replace(/(^|[^\w&;\/#])#(\d{1,6})\b/g,function(m,pre,n){return pre+hold(o.refs(+n));});
  s=s.replace(/(?: {2,}|\\)\n/g,"<br>");if(o.breaks)s=s.replace(/\n/g,"<br>");
  return s.replace(/\u0001(\d+)\u0002/g,function(m,i){return held[+i];});}
var LI=/^( {0,3})([-*+]|\d{1,9}[.)])( +|$)(.*)$/;
function tableCells(row){row=row.trim();if(row.charAt(0)==="|")row=row.slice(1);if(row.slice(-1)==="|"&&row.slice(-2)!=="\\|")row=row.slice(0,-1);
  var out=[],cur="",code=false;for(var k=0;k<row.length;k++){var ch=row.charAt(k);if(ch==="\\"&&row.charAt(k+1)==="|"){cur+="\\|";k++;continue;}if(ch==="`")code=!code;if(ch==="|"&&!code){out.push(cur.trim());cur="";continue;}cur+=ch;}out.push(cur.trim());return out;}
function mdBlocks(L,o,tight){var out=[],i=0,para=[];
  function flush(){if(!para.length)return;var x=mdInline(para.join("\n"),o);out.push(tight?x:"<p>"+x+"</p>");para=[];}
  function blank(l){return /^\s*$/.test(l);}
  while(i<L.length){var l=L[i],m;
    if(blank(l)){flush();i++;continue;}
    if((m=/^ {0,3}(`{3,}|~{3,})\s*([^`\s]*)[^`]*$/.exec(l))){flush();var fence=m[1],lang=m[2],code=[];i++;
      while(i<L.length&&!(new RegExp("^ {0,3}"+fence.charAt(0).replace("~","\\~")+"{"+fence.length+",}\\s*$")).test(L[i])){code.push(L[i]);i++;}i++;
      out.push("<pre"+(lang?' data-lang="'+esc(lang)+'"':"")+"><code>"+esc(code.join("\n"))+"</code></pre>");continue;}
    if((m=/^ {0,3}(#{1,6})(?:[ \t]+(.*?))?[ \t]*(?:[ \t]#+[ \t]*)?$/.exec(l))&&(m[2]!=null||/^ {0,3}#{1,6}\s*$/.test(l))){flush();var lv=m[1].length,tx=(m[2]||"").replace(/[ \t]+#+[ \t]*$/,"");
      out.push("<h"+lv+' data-anchor="'+esc(slug(tx))+'">'+mdInline(tx,o)+"</h"+lv+">");i++;continue;}
    if(para.length&&(m=/^ {0,3}(=+|-+)\s*$/.exec(l))){var lv2=m[1].charAt(0)==="="?1:2,tx2=para.join(" ");para=[];out.push("<h"+lv2+' data-anchor="'+esc(slug(tx2))+'">'+mdInline(tx2,o)+"</h"+lv2+">");i++;continue;}
    if(/^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/.test(l)){flush();out.push("<hr>");i++;continue;}
    if(/^ {0,3}>/.test(l)){flush();var q=[];while(i<L.length&&!blank(L[i])&&(/^ {0,3}>/.test(L[i])||q.length)){q.push(L[i].replace(/^ {0,3}> ?/,""));i++;}
      out.push("<blockquote>"+mdBlocks(q,o,false)+"</blockquote>");continue;}
    if(l.indexOf("|")>=0&&i+1<L.length&&/^ {0,3}\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(L[i+1])&&L[i+1].indexOf("-")>=0&&(L[i+1].indexOf("|")>=0||l.trim().charAt(0)==="|")){
      flush();var hd=tableCells(l),al=tableCells(L[i+1]).map(function(c){return /^:-+:$/.test(c)?"center":/-+:$/.test(c)?"right":/^:-+/.test(c)?"left":"";});i+=2;
      var rows=[];while(i<L.length&&!blank(L[i])&&L[i].indexOf("|")>=0){rows.push(tableCells(L[i]));i++;}
      function cell(tag,c,k){return "<"+tag+(al[k]?' style="text-align:'+al[k]+'"':"")+">"+mdInline(String(c||"").replace(/\\\|/g,"|"),o)+"</"+tag+">";}
      out.push("<table><thead><tr>"+hd.map(function(c,k){return cell("th",c,k);}).join("")+"</tr></thead><tbody>"+rows.map(function(rw){return "<tr>"+hd.map(function(_,k){return cell("td",rw[k],k);}).join("")+"</tr>";}).join("")+"</tbody></table>");continue;}
    if((m=LI.exec(l))&&!(para.length&&m[4]==="")){flush();var ordered=/\d/.test(m[2]),mark=ordered?m[2].slice(-1):m[2],start=ordered?parseInt(m[2],10):1,items=[],loose=false,end=false;
      while(i<L.length&&!end){var mm=LI.exec(L[i]);if(!mm)break;var same=ordered?(/\d/.test(mm[2])&&mm[2].slice(-1)===mark):mm[2]===mark;if(!same)break;
        var ind=mm[1].length+mm[2].length+(mm[3].length>4||!mm[3].length?1:mm[3].length),item=[mm[4]];i++;
        while(i<L.length){var x=L[i];
          if(blank(x)){var j=i+1;while(j<L.length&&blank(L[j]))j++;if(j>=L.length){i=j;end=true;break;}var nx=L[j],ni=nx.match(/^ */)[0].length;
            if(ni>=ind){while(i<j){item.push("");i++;}loose=true;continue;}
            var nm=LI.exec(nx);if(nm&&ni<ind&&(ordered?(/\d/.test(nm[2])&&nm[2].slice(-1)===mark):nm[2]===mark)){loose=true;i=j;break;}
            i=j;end=true;break;}
          var xi=x.match(/^ */)[0].length;
          if(xi>=ind){item.push(x.slice(ind));i++;continue;}
          if(LI.test(x)||/^ {0,3}(#{1,6}(\s|$)|>|`{3,}|~{3,})/.test(x)||/^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/.test(x))break;
          item.push(x.trim());i++;}
        items.push(item);}
      out.push((ordered?"<ol"+(start!==1?' start="'+start+'"':"")+">":"<ul>")+items.map(function(it){var t=/^\[([ xX])\][ \t]+/.exec(it[0]||"");if(t)it[0]=it[0].slice(t[0].length);
        return "<li"+(t?' class="task"':"")+">"+(t?'<input type="checkbox" disabled'+(t[1]!==" "?" checked":"")+' aria-label="'+(t[1]!==" "?"done":"not done yet")+'">':"")+mdBlocks(it,o,!loose)+"</li>";}).join("")+(ordered?"</ol>":"</ul>"));continue;}
    if(!para.length&&/^ {4,}/.test(l)){var cb=[];while(i<L.length&&(/^ {4,}/.test(L[i])||blank(L[i]))){cb.push(L[i].slice(4));i++;}while(cb.length&&blank(cb[cb.length-1]))cb.pop();
      out.push("<pre><code>"+esc(cb.join("\n"))+"</code></pre>");continue;}
    para.push(l.replace(/^ {0,3}/,""));i++;}
  flush();return out.join("\n");}
function md(src,o){return mdBlocks(String(src==null?"":src).replace(/\r\n?/g,"\n").replace(/\t/g,"    ").split("\n"),o||{},false);}

/* ---------- the view state of each app (kept for this visit), and painting again when something is read ---------- */
var VS={};
function V(r){var v=VS[r.id];if(!v)v=VS[r.id]={code:{ref:null,dir:"",file:null,mode:"view",q:"",cs:false,line:0,show:2000,qrun:null,res:false,prev:true},
  iss:{st:"open",q:"",lab:"",open:null},pr:{st:"open",q:"",open:null,tab:"conv",form:null},cmp:{a:null,b:null,shut:{},focus:null},act:{open:null,ref:null},
  wiki:{page:"Home",mode:"view",rev:null},ins:{lines:false,table:false},board:{focus:null}};return v;}
var DONE={},WAIT={};
/* a value read once for a key and kept; while it is being read the view says so, and it is painted again when it comes */
function want(key,fn){if(Object.prototype.hasOwnProperty.call(DONE,key))return DONE[key];
  if(!WAIT[key]){WAIT[key]=1;Promise.resolve().then(fn).then(function(v){DONE[key]=v;},function(e){DONE[key]={__err:e&&e.message?e.message:String(e)};}).then(function(){delete WAIT[key];if(Object.keys(DONE).length>500){var v=DONE[key];DONE={};DONE[key]=v;}repaint();});}
  return undefined;}
function gk(r,k){return r.id+"|"+(r.changed||0)+"|"+(r.head||"")+"|"+k;}
function isErr(x){return !!(x&&typeof x==="object"&&x.__err);}
function waitBox(w,text){var e=h("div","f-empty h-blk",esc(text));w.appendChild(e);return e;}
function errBox(w,msg,key){var e=h("div","f-empty h-blk","<b>That did not work</b>"+esc(cap(msg)));var k=btn("sm","Try again",function(){delete DONE[key];repaint(true);});k.style.marginTop="10px";e.appendChild(h("br"));e.appendChild(k);w.appendChild(e);}
var RP=0,SIG="";
function mine(v){return !!(HUB.views[v]);}
/* painted again: the view's place in its scroll is kept when it is the same page of the same view */
function repaint(now){if(RP&&!now)return;var run=function(){RP=0;var x=X();if(!x||!$("fb"))return;if(!mine(x.S.view)){decorate();return;}var r=x.cur();if(!r)return;
    var w=$("fbWorkBody"),sig=SIG,top=w?w.scrollTop:0;x.paintWork();try{x.thumbs();}catch(e){}if(w&&SIG===sig)w.scrollTop=top;};
  if(now){clearTimeout(RP);run();return;}RP=setTimeout(run,24);}
function sig(r,s){SIG=r.id+"|"+s;}
function show(view){var x=X();if(!x)return;x.S.view=view;x.S.cmp=null;x.S.file=0;var w=$("fbWorkBody");if(w)w.scrollTop=0;
  if(x.one&&x.one())try{x.setPanel("work");}catch(e){}x.paintWork();try{x.thumbs();}catch(e){}tabIntoView();}
function again(){var x=X();if(!x)return Promise.resolve();try{x.C.diff={};x.C.files={};x.C.log={};}catch(e){}return x.refresh().then(function(){x.paint();});}
function picker(opts,val,label,onch){var s=h("select","h-sel");s.setAttribute("aria-label",label);var found=false;
  opts.forEach(function(g){var par=s;if(g.group){par=document.createElement("optgroup");par.label=g.group;s.appendChild(par);}(g.items||[g]).forEach(function(o){var op=document.createElement("option");op.value=o.v;op.textContent=o.t;if(o.v===val){op.selected=true;found=true;}par.appendChild(op);});});
  if(!found&&val){var op=document.createElement("option");op.value=val;op.textContent=refLabel(val);op.selected=true;s.insertBefore(op,s.firstChild);}
  s.onchange=function(){onch(s.value);};return s;}
/* every idea, release and version, for a picker */
function refOptions(r,withEmpty){var vers=want(gk(r,"allv"),function(){return allVersions(r,600);});var g=[];
  g.push({group:"Ideas",items:r.branches.slice().sort(function(a,b){return a==="main"?-1:b==="main"?1:a.localeCompare(b);}).map(function(b){return {v:"refs/heads/"+b,t:b+(b===r.branch&&!r.detached?" (working here)":"")};})});
  if(r.tags.length)g.push({group:"Releases",items:r.tags.slice().sort().reverse().map(function(t){return {v:"refs/tags/"+t,t:t};})});
  if(vers&&!isErr(vers)&&vers.length)g.push({group:"Versions",items:vers.slice(0,250).map(function(c){return {v:c.oid,t:c.short+" · "+(c.title.length>48?c.title.slice(0,47)+"…":c.title)};})});
  if(withEmpty)g.push({group:"Before",items:[{v:"empty",t:"Nothing yet (the start)"}]});return g;}
function liveRegion(){var x=$("fb"),l=x&&x.querySelector(".h-live");if(x&&!l){l=h("div","h-live");l.setAttribute("aria-live","polite");x.appendChild(l);}return l;}
function say(m){var l=liveRegion();if(l){l.textContent="";setTimeout(function(){l.textContent=m;},30);}}

/* ---------- the icons GitHub's readers know: an issue open or closed, a pull request open, merged or closed ---------- */
var SV='<svg class="h-ic CLS" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">';
var IC={iopen:SV.replace("CLS","open")+'<circle cx="8" cy="8" r="6.2"/><circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none"/></svg>',
  ishut:SV.replace("CLS","closed")+'<circle cx="8" cy="8" r="6.2"/><path d="M5.2 8.2l1.9 1.9 3.8-4"/></svg>',
  popen:SV.replace("CLS","open")+'<circle cx="4" cy="3.6" r="1.7"/><circle cx="4" cy="12.4" r="1.7"/><circle cx="12" cy="12.4" r="1.7"/><path d="M4 5.3v5.4M12 10.7V6.5c0-1.4-1.1-2.5-2.5-2.5H7.4M8.8 2.6L7.4 4l1.4 1.4"/></svg>',
  pmerged:SV.replace("CLS","merged")+'<circle cx="4" cy="3.6" r="1.7"/><circle cx="4" cy="12.4" r="1.7"/><circle cx="12" cy="8.6" r="1.7"/><path d="M4 5.3v5.4M4 5.3c0 2.4 2.7 3.3 6.3 3.3"/></svg>',
  pshut:SV.replace("CLS","shut")+'<circle cx="4" cy="3.6" r="1.7"/><circle cx="4" cy="12.4" r="1.7"/><circle cx="12" cy="12.4" r="1.7"/><path d="M4 5.3v5.4M12 10.7V8.4M10.4 3l3.2 3.2M13.6 3l-3.2 3.2"/></svg>',
  note:SV.replace("CLS","")+'<path d="M3.5 2.5h9v11h-9z"/><path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3"/></svg>',
  talk:'<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M2.5 3.5h11v7.2h-6.2l-3.1 2.6v-2.6H2.5z"/></svg>'};
function icOf(it){if(it.kind==="pr")return it.state==="merged"?IC.pmerged:it.state==="closed"?IC.pshut:IC.popen;return it.state==="closed"?IC.ishut:IC.iopen;}

/* ---------- the numbers shared by issues and pull requests (#1, #2...), and what a message says of them ---------- */
function issueN(rec,n){for(var i=0;i<rec.issues.length;i++)if(rec.issues[i].n===n)return rec.issues[i];return null;}
function pullN(rec,n){for(var i=0;i<rec.pulls.length;i++)if(rec.pulls[i].n===n)return rec.pulls[i];return null;}
function itemN(rec,n){return issueN(rec,n)||pullN(rec,n);}
var CLOSE_RE=/\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s*:?\s+#(\d+)\b/ig,MENTION_RE=/(^|[^\w&;\/#])#(\d+)\b/g;
function refsIn(text){text=String(text||"");var close={},men={},m;CLOSE_RE.lastIndex=0;while((m=CLOSE_RE.exec(text)))close[+m[1]]=1;MENTION_RE.lastIndex=0;while((m=MENTION_RE.exec(text)))men[+m[2]]=1;
  return {close:Object.keys(close).map(Number),men:Object.keys(men).map(Number)};}
function closeIssue(it,by){it.state="closed";it.closedAt=Date.now();it.closedBy=by;it.updated=Date.now();it.events.push({at:Date.now(),kind:"closed",by:by});}
function reopenIssue(it){it.state="open";it.closedBy=null;it.closedAt=null;it.updated=Date.now();it.events.push({at:Date.now(),kind:"reopened"});}
/* the pull requests that mention an issue, read from what they say */
function prsMentioning(rec,n){return rec.pulls.filter(function(p){if(p.n===n)return false;var t=[p.title,p.body].concat(p.comments.map(function(c){return c.body;})).join("\n");return refsIn(t).men.indexOf(n)>=0;});}

/* ---------- versions kept: "fixes #3" closes issue 3 when the version reaches the main idea; a pull request whose
   versions have all come in is merged; and when the owner asked for it, the checks run on every version kept ---------- */
var SCANSIG={},INFLIGHT={};
function scan(r,force){var rec=REC[r.id];if(!rec||!r.head)return Promise.resolve({changed:false,closed:[],merged:[]});var sg=r.head+"|"+r.branches.join(",");
  if(!force&&SCANSIG[r.id]===sg)return Promise.resolve({changed:false,closed:[],merged:[]});SCANSIG[r.id]=sg;
  var main=defBranch(r,rec),changed=false,closed=[],merged=[];
  var tips=r.branches.slice().sort(function(a,b){return a===main?-1:b===main?1:0;});
  return seq(tips,function(b){var isMain=b===main;return IngRepo.log(r.id,{ref:"refs/heads/"+b,max:isMain?400:150}).then(function(log){
      log.forEach(function(c){var st=rec.seen[c.oid]||0;if(st>=2||(!isMain&&st>=1))return;if(!/#\d/.test(c.msg))return;var R=refsIn(c.msg);
        if(st<1)R.men.forEach(function(n){var it=issueN(rec,n);if(it&&!it.refs.some(function(x){return x.oid===c.oid;})){it.refs.push({kind:"version",oid:c.oid,short:c.short,title:c.title,at:c.when||Date.now(),idea:b});}});
        if(isMain)R.close.forEach(function(n){var it=issueN(rec,n);if(it&&it.state==="open"){closeIssue(it,{kind:"version",oid:c.oid,short:c.short,title:c.title,idea:b});closed.push(n);}});
        rec.seen[c.oid]=isMain?2:1;changed=true;});},function(){});})
  .then(function(){return checkPulls(r,rec,merged);}).then(function(ch){if(!changed&&!ch)return {changed:false,closed:closed,merged:merged};
    var ks=Object.keys(rec.seen);if(ks.length>4000)ks.slice(0,ks.length-4000).forEach(function(k){delete rec.seen[k];});
    syncBoard(rec);return keep(rec).then(function(){return {changed:true,closed:closed,merged:merged};});});}
/* an open pull request whose versions are all in its target now is merged (brought in from Ideas, or after a merge whose
   files held both versions was kept) */
function checkPulls(r,rec,merged){var open=rec.pulls.filter(function(p){return p.state==="open"&&!INFLIGHT[r.id+"|"+p.n];});if(!open.length)return Promise.resolve(false);var any=false;
  return seq(open,function(p){if(r.branches.indexOf(p.to)<0)return;var fromTip=p.pending&&p.pending.theirs?Promise.resolve(p.pending.theirs):(r.branches.indexOf(p.from)>=0?IngRepo.resolve(r.id,"refs/heads/"+p.from):Promise.resolve(null));
    return fromTip.then(function(fo){if(!fo)return;return IngRepo.log(r.id,{ref:"refs/heads/"+p.to,max:600}).then(function(log){var has=log.some(function(c){return c.oid===fo;});if(!has)return;
      var mc=log.filter(function(c){return c.parents.indexOf(fo)>=0;}).pop();
      markMerged(rec,p,{commit:mc?mc.oid:log[0].oid,head:fo,base:p.pending&&p.pending.base||null,outside:!p.pending});merged.push(p.n);any=true;});}).catch(function(){});}).then(function(){return any;});}
function markMerged(rec,p,o){p.state="merged";p.pending=null;p.merged={at:Date.now(),commit:o.commit,head:o.head,base:o.base||null,by:who(),outside:!!o.outside};p.updated=Date.now();
  p.events.push({at:Date.now(),kind:"merged",commit:o.commit,outside:!!o.outside});
  var R=refsIn(p.title+"\n"+p.body);R.close.forEach(function(n){var it=issueN(rec,n);if(it&&it.state==="open")closeIssue(it,{kind:"pr",n:p.n});});}
function afterKept(id,oid){return recP(id).then(function(rec){return IngRepo.info(id).then(function(r){return scan(r,true).then(function(res){
    if(res.closed.length)setTimeout(function(){toast("Issue "+nums(res.closed)+(res.closed.length>1?" are":" is")+" closed by this version.");},1700);
    else if(res.merged.length)setTimeout(function(){toast("Pull request "+nums(res.merged)+(res.merged.length>1?" are":" is")+" merged.");},1700);
    if(rec.auto&&oid)runChecks(r,oid,"kept",r.detached?null:r.branch).catch(function(){});repaint();});});}).catch(function(e){try{console.warn("R141 after a version",e);}catch(_){}});}

/* ---------- Actions: Fabrica's own five checks as runs, one at a time ---------- */
var RUNQ=Promise.resolve(),LIVE={};
function runChecks(r,ref,by,label){if(typeof IngShip==="undefined"||!IngShip.test)return Promise.reject(new Error("this copy has no checks to run"));
  var job=RUNQ.then(function(){var t0=Date.now();LIVE[r.id]={ref:ref,checks:[],at:t0,by:by};repaint();
    return IngShip.test(r.id,{ref:ref,onStep:function(c){if(LIVE[r.id]){LIVE[r.id].checks.push(c);repaint();}}}).then(function(out){
      return Promise.all([recP(r.id),IngRepo.log(r.id,{ref:out.commit,max:1}).catch(function(){return [];})]).then(function(x){var rec=x[0],c=x[1][0]||{};rec.runN=(rec.runN||0)+1;
        var run={n:rec.runN,oid:out.commit,short:String(out.commit||"").slice(0,7),title:c.title||"",ref:label||refLabel(ref),at:Date.now(),took:Date.now()-t0,ok:!!(out.ok&&out.page),page:out.page||"",checks:(out.checks||[]).map(function(k){return {id:k.id,label:k.label,state:k.state,detail:k.detail};}),by:by};
        rec.runs.unshift(run);rec.runs=rec.runs.slice(0,100);delete LIVE[r.id];return keep(rec).then(function(){return run;});});});})
  .then(function(run){repaint();var x=X();if(x)x.refresh().then(function(){x.paint();},function(){});return run;},function(e){delete LIVE[r.id];repaint();throw e;});
  RUNQ=job.catch(function(){});return job;}

/* ---------- Projects: the cards follow what they stand for ---------- */
function syncBoard(rec){var b=rec.board,cols=["todo","doing","done"];
  cols.forEach(function(c){b[c]=b[c].filter(function(k){var p=k.split(":"),n=+p[1];if(p[0]==="note")return !!b.notes[p[1]];if(p[0]==="issue")return !!issueN(rec,n);if(p[0]==="pr")return !!pullN(rec,n);return false;});});
  cols.slice(0,2).forEach(function(c){b[c]=b[c].filter(function(k){var p=k.split(":"),n=+p[1],it=p[0]==="issue"?issueN(rec,n):p[0]==="pr"?pullN(rec,n):null;
    if(it&&it.state!=="open"){if(b.done.indexOf(k)<0)b.done.unshift(k);return false;}return true;});});}
function onBoard(rec,k){return ["todo","doing","done"].some(function(c){return rec.board[c].indexOf(k)>=0;});}

/* ---------- a label: its colour, and words dark or light enough to read on it ---------- */
function inkOn(hex){var m=/^#?([0-9a-f]{6})$/i.exec(String(hex||""));if(!m)return "#fff";var n=parseInt(m[1],16),c=[n>>16&255,n>>8&255,n&255].map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
  var L=0.2126*c[0]+0.7152*c[1]+0.0722*c[2];return L>0.179?"#1d1626":"#ffffff";}
function labelOf(rec,name){for(var i=0;i<rec.labels.length;i++)if(rec.labels[i].name===name)return rec.labels[i];return null;}
function labChip(rec,name,tag){var l=labelOf(rec,name)||{name:name,color:"#8a8296"},e=T(tag||"span","h-lab",l.name);e.style.setProperty("--lc",l.color);e.style.setProperty("--lt",inkOn(l.color));if(l.desc)e.title=l.desc;return e;}

/* ---------- Markdown in a view: issue numbers, files of the app and pictures of the app answer a press ---------- */
function mdOpts(r,rec,extra){var o={breaks:false};
  if(rec)o.refs=function(n){var it=itemN(rec,n);if(!it)return "#"+n;return '<a href="#" class="h-iref" data-ref="'+n+'" title="'+esc(it.title)+'">#'+n+"</a>";};
  if(extra)for(var k in extra)o[k]=extra[k];return o;}
function joinPath(dir,rel){rel=decodeURI2(String(rel).split("#")[0].split("?")[0]);if(!rel)return null;var parts=(rel.charAt(0)==="/"?[]:String(dir||"").split("/").filter(Boolean)).concat(rel.split("/")),out=[];
  parts.forEach(function(p){if(!p||p===".")return;if(p==="..")out.pop();else out.push(p);});return out.join("/")||null;}
function mdInto(el,html,r,rec,ref){el.innerHTML=html;
  [].forEach.call(el.querySelectorAll("img[data-p]"),function(im){var p=im.getAttribute("data-p");IngRepo.files(r.id,ref).then(function(list){var f=list.filter(function(x){return x.path===p;})[0];if(!f)return null;return blob(f.oid);}).then(function(b){if(!b)return;
    var u=URL.createObjectURL(new Blob([b],{type:/\.svg$/i.test(p)?"image/svg+xml":"image/"+(/\.jpe?g$/i.test(p)?"jpeg":(p.split(".").pop()||"png").toLowerCase())}));im.src=u;setTimeout(function(){URL.revokeObjectURL(u);},120000);}).catch(function(){});});
  el.addEventListener("click",function(e){var a=e.target.closest?e.target.closest("a"):null;if(!a||!el.contains(a))return;
    if(a.hasAttribute("data-ref")){e.preventDefault();openItem(r,+a.getAttribute("data-ref"));return;}
    if(a.hasAttribute("data-wiki")){e.preventDefault();var v=V(r).wiki;v.page=a.getAttribute("data-wiki");v.mode=a.classList.contains("h-new")?"edit":"view";v.rev=null;show("wiki");return;}
    if(a.hasAttribute("data-path")){e.preventDefault();var c=V(r).code,p=a.getAttribute("data-path");IngRepo.files(r.id,c.ref||undefined).then(function(list){var isDir=list.some(function(x){return x.path.indexOf(p+"/")===0;}),has=list.some(function(x){return x.path===p;});
        if(!has&&!isDir){toast("“"+p+"” is not in this version.");return;}if(isDir){c.dir=p+"/";c.file=null;}else{c.file=p;c.mode="view";c.line=0;}c.res=false;show("code");},fail);return;}
    if(a.hasAttribute("data-anchor")){e.preventDefault();var t=el.querySelector('[data-anchor="'+a.getAttribute("data-anchor")+'"]:not(a)');if(t)t.scrollIntoView({block:"start",behavior:"smooth"});}});}
function openItem(r,n){var rec=REC[r.id];if(!rec)return;var it=itemN(rec,n);if(!it){toast("There is no #"+n+" here.");return;}
  if(it.kind==="pr"){var v=V(r).pr;v.open=n;v.tab="conv";show("pulls");}else{V(r).iss.open=n;show("issues");}}

/* a row of keys, one pressed. Every repaint makes the row afresh, so its sliding thumb is placed at once the first time
   (it would otherwise grow from nothing and leave the pressed key's white words on a pale ground for a moment), and slides
   after that; in a sheet, where nothing repaints, it is placed when the row is on the page */
function segBox(label){var seg=h("div","f-seg"),th=h("span","f-thumb");seg.setAttribute("role","group");seg.setAttribute("aria-label",label);th.style.transition="none";seg.appendChild(th);
  var raf=window.requestAnimationFrame||function(fn){return setTimeout(fn,16);};
  raf(function(){if(seg.isConnected&&!th.style.width)try{var x=X();if(x)x.thumbs();}catch(e){}raf(function(){th.style.transition="";});});return seg;}
/* ---------- a box to write Markdown in, with its preview ---------- */
function composer(opt){opt=opt||{};var wrap=h("div","h-compose"),seg=segBox("Write or preview"),ta=h("textarea"),pv=h("div","h-prev h-md");
  var bw=h("button",null,"Write"),bp=h("button",null,"Preview");bw.type=bp.type="button";bw.setAttribute("aria-pressed","true");bp.setAttribute("aria-pressed","false");seg.appendChild(bw);seg.appendChild(bp);
  ta.placeholder=opt.ph||"Write here. Markdown works: **bold**, _italic_, `code`, lists, links, tables, and #3 to point at an issue.";ta.setAttribute("aria-label",opt.label||"Text");ta.value=opt.value||"";if(opt.id)ta.id=opt.id;ta.style.minHeight=(opt.rows||5)*1.5+"em";
  pv.hidden=true;function mode(p){bw.setAttribute("aria-pressed",p?"false":"true");bp.setAttribute("aria-pressed",p?"true":"false");ta.hidden=p;pv.hidden=!p;
    if(p){var html=md(ta.value,opt.mdo||{breaks:true});mdInto(pv,html||'<p class="h-empty-n">Nothing to preview yet.</p>',opt.r,opt.rec,opt.ref);}try{var x=X();if(x)x.thumbs();}catch(e){}}
  bw.onclick=function(){mode(false);ta.focus();};bp.onclick=function(){mode(true);};
  ta.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&e.key==="Enter"&&opt.onSubmit){e.preventDefault();opt.onSubmit();}});
  if(opt.oninput)ta.addEventListener("input",function(){opt.oninput(ta.value);});
  wrap.appendChild(seg);wrap.appendChild(ta);wrap.appendChild(pv);return {el:wrap,ta:ta,get:function(){return ta.value;},set:function(v){ta.value=v;mode(false);},focus:function(){ta.focus();}};}
/* one line, asked for in Fabrica's own sheet, already filled in */
function askLine(title,lead,value,fn,ph){var x=X();var sh=x.sheet(title,lead),inp=h("input");inp.type="text";inp.value=value||"";inp.placeholder=ph||"";inp.setAttribute("aria-label",title);sh.box.appendChild(inp);
  var end=h("div","end"),ok=btn("pri","Done",function(){var v=inp.value.trim();if(!v){inp.focus();return;}ok.disabled=true;Promise.resolve().then(function(){return fn(v);}).then(sh.close,function(e){ok.disabled=false;fail(e);});});
  end.appendChild(btn("","Close",sh.close));end.appendChild(ok);sh.box.appendChild(end);inp.onkeydown=function(e){if(e.key==="Enter")ok.click();if(e.key==="Escape")sh.close();};setTimeout(function(){inp.focus();inp.select();},60);return sh;}
function askText(title,lead,value,fn,r,rec){var x=X();var sh=x.sheet(title,lead),c=composer({value:value,r:r,rec:rec,mdo:mdOpts(r,rec,{breaks:true}),rows:8});c.el.style.padding="0";sh.box.appendChild(c.el);
  var end=h("div","end"),ok=btn("pri","Save",function(){ok.disabled=true;Promise.resolve().then(function(){return fn(c.get());}).then(sh.close,function(e){ok.disabled=false;fail(e);});});
  end.appendChild(btn("","Close",sh.close));end.appendChild(ok);sh.box.appendChild(end);setTimeout(function(){c.focus();},60);return sh;}

/* ======================= CODE: the app at any idea, release or version ======================= */
function codeRef(r){var c=V(r).code;if(c.ref){var ok=isBranchRef(c.ref)?r.branches.indexOf(c.ref.slice(11))>=0:c.ref.indexOf("refs/tags/")===0?r.tags.indexOf(c.ref.slice(10))>=0:/^[0-9a-f]{40}$/.test(c.ref);if(ok)return c.ref;}
  c.ref=r.detached?r.head:"refs/heads/"+(r.branch||defBranch(r,REC[r.id]));return c.ref;}
function onBranchHere(r,ref){return !r.detached&&!!r.branch&&ref==="refs/heads/"+r.branch;}
function rightOf(el){el.classList.add("h-right");return el;}
function paintCode(r,w,f){var v=V(r).code;
  if(!r.head){w.appendChild(h("div","f-empty h-blk","<b>No version to look at yet</b>Keep a first version under Changes; then its files show here at any idea, release or version."));return;}
  var ref=codeRef(r),rec=recOf(r);
  var bar=h("div","h-bar h-blk");
  bar.appendChild(picker(refOptions(r),ref,"Which idea, release or version",function(val){v.ref=val;v.line=0;repaint(true);}));
  var form=h("form");form.setAttribute("role","search");var q=h("input");q.type="search";q.placeholder="Search the code";q.value=v.q||"";q.setAttribute("aria-label","Search the code at this version");q.id="hCodeQ";
  var cs=h("label","f-sw");cs.innerHTML='<input type="checkbox"'+(v.cs?" checked":"")+' aria-label="Match capitals exactly">Aa';cs.title="Match capitals exactly";
  var go=btn("sm","Search",null);go.type="submit";form.appendChild(q);form.appendChild(cs);form.appendChild(go);
  form.onsubmit=function(e){e.preventDefault();var t=q.value.trim();v.cs=cs.querySelector("input").checked;v.q=t;if(!t){v.res=false;v.qrun=null;repaint(true);return;}v.qrun={q:t,cs:v.cs};v.res=true;repaint(true);};
  bar.appendChild(form);w.appendChild(bar);
  if(v.res&&v.qrun)return codeSearch(r,v,ref,w,f,rec);
  if(v.file)return codeFile(r,v,ref,w,f,rec);
  return codeDir(r,v,ref,w,f,rec);}
function crumbs(r,v,path,w,isFile){var c=h("nav","h-crumbs h-blk");c.setAttribute("aria-label","Where you are in the app");var root=btn("",r.name,null);root.className="";root.onclick=function(){v.dir="";v.file=null;v.res=false;repaint(true);};c.appendChild(root);
  var parts=String(path||"").split("/").filter(Boolean);parts.forEach(function(p,i){c.appendChild(T("span",null,"/"));var last=i===parts.length-1;
    if(last){var b=T("b",null,p);b.setAttribute("aria-current","page");c.appendChild(b);}else{var k=document.createElement("button");k.type="button";k.textContent=p;var to=parts.slice(0,i+1).join("/")+"/";k.onclick=function(){v.dir=to;v.file=null;v.res=false;repaint(true);};c.appendChild(k);}});
  w.appendChild(c);}
function about(r,rec,w){var a=rec.about||{},desc=a.desc||r.desc||"";if(!desc&&!a.site&&!a.topics.length&&!rec.star&&!rec.forkOf&&!rec.from)return;
  var box=h("div","h-about h-blk");if(desc)box.appendChild(T("div",null,desc));
  var row=h("div","h-row");if(a.site&&safeUrl(a.site)&&/^https?:/i.test(a.site)){var l=T("a",null,a.site.replace(/^https?:\/\//i,""));l.href=a.site;l.target="_blank";l.rel="noopener noreferrer";row.appendChild(l);}
  a.topics.forEach(function(t){row.appendChild(T("span","h-topic",t));});if(rec.star)row.appendChild(T("span","f-chip","★ Starred"));
  if(rec.forkOf)row.appendChild(T("span","f-chip","Forked from "+rec.forkOf.name));if(rec.from)row.appendChild(T("span","f-chip","Made from the template "+rec.from.name));
  if(row.childNodes.length)box.appendChild(row);w.appendChild(box);}
function codeDir(r,v,ref,w,f,rec){var key=gk(r,"files|"+ref),list=want(key,function(){return IngRepo.files(r.id,ref);});sig(r,"code|"+ref+"|"+v.dir);
  crumbs(r,v,v.dir,w,false);
  var last=want(gk(r,"last|"+ref),function(){return IngRepo.log(r.id,{ref:ref,max:1});});
  if(last&&!isErr(last)&&last[0]){var c=last[0],ln=h("div","h-line h-blk");ln.innerHTML="<span>Latest</span><b>"+esc(c.title)+'</b><span class="h-id">'+esc(c.short)+"</span><span>"+esc(when(c.when))+"</span>";
    ln.appendChild(rightOf(btn("quiet sm","History",function(){show("history");})));w.appendChild(ln);}
  if(!v.dir&&rec)about(r,rec,w);
  if(list===undefined)return waitBox(w,"Reading the files…");if(isErr(list))return errBox(w,list.__err,key);
  var dir=v.dir||"",rows={},order=[];
  list.forEach(function(x){if(x.path.indexOf(dir)!==0)return;var rest=x.path.slice(dir.length),i=rest.indexOf("/");
    if(i<0){rows[rest]={path:x.path,size:x.size,oid:x.oid,dir:false};order.push(rest);}else{var dn=rest.slice(0,i+1);if(!rows[dn]){rows[dn]={path:dir+dn,dir:true,n:0,size:0};order.push(dn);}rows[dn].n++;rows[dn].size+=x.size||0;}});
  if(dir&&!order.length){v.dir="";return repaint();}
  order.sort(function(a,b){var da=rows[a].dir,db=rows[b].dir;if(da!==db)return da?-1:1;return a.localeCompare(b);});
  var tr=h("div","f-tree h-blk");tr.setAttribute("role","list");tr.setAttribute("aria-label","Folders and files");
  if(dir){var up=h("button","f-node");up.type="button";up.innerHTML='<span class="ic">↑</span><span class="nm">..</span><span class="sz">up a folder</span>';up.onclick=function(){v.dir=dir.replace(/[^/]+\/$/,"");repaint(true);};tr.appendChild(up);}
  order.forEach(function(nm){var x=rows[nm],n=h("button","f-node");n.type="button";n.setAttribute("role","listitem");
    n.innerHTML='<span class="ic">'+(x.dir?"▸":"·")+'</span><span class="nm">'+esc(nm)+'</span><span class="sz">'+(x.dir?plural(x.n,"file")+" · "+kb(x.size):kb(x.size))+"</span>";
    n.onclick=function(){if(x.dir){v.dir=x.path;}else{v.file=x.path;v.line=0;v.mode=/\.(md|markdown)$/i.test(x.path)?"prev":"view";v.show=2000;}repaint(true);};tr.appendChild(n);});
  w.appendChild(tr);
  var rd=order.filter(function(nm){return !rows[nm].dir&&/^readme(\.(md|markdown|txt))?$/i.test(nm);}).sort(function(a,b){return (/\.md|\.markdown/i.test(b)?1:0)-(/\.md|\.markdown/i.test(a)?1:0);})[0];
  if(rd){var x=rows[rd],tk="t|"+x.oid,t=want(tk,function(){return textOf(x.oid);});var box=h("section","h-readme h-blk");box.setAttribute("aria-label","README");
    box.innerHTML='<div class="h-readme-h">README<span>'+esc(x.path)+"</span></div>";
    if(t===undefined)box.appendChild(T("div","h-md","Reading it…")).style.padding="14px 18px";
    else if(isErr(t)||t==null)box.appendChild(T("div","h-md","It could not be read.")).style.padding="14px 18px";
    else if(/\.(md|markdown)$/i.test(rd)||!/\./.test(rd)){var mdv=h("div","h-md");mdv.id="hReadme";box.appendChild(mdv);mdInto(mdv,md(t,mdOpts(r,rec,repoMd(dir))),r,rec,ref);}
    else{box.appendChild(T("pre","h-plain",t));}
    w.appendChild(box);}
  f.appendChild(btn("","Download this version (zip)",function(ev){var b=ev.currentTarget;b.disabled=true;IngRepo.sourceZip(r.id,ref).then(function(z){var x2=X(),nm=r.slug+"-"+refLabel(ref).replace(/[^\w.-]+/g,"_")+".zip";return x2.saveBytes(nm,"application/zip",z).then(function(){toast("Saved: "+nm+", "+kb(z.length)+".");});}).then(function(){b.disabled=false;},function(e){b.disabled=false;fail(e);});}));
  if(onBranchHere(r,ref))f.appendChild(btn("","Edit a file",function(){X().openEditor(r);}));}
function repoMd(dir){return {path:function(u){return joinPath(dir,u);},img:function(src,alt){var u=safeUrl(src);if(u==null)return '<span class="h-alt">'+esc(alt||"a picture")+"</span>";
  if(/^https?:/i.test(u))return '<a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer" class="h-alt">'+esc(alt||"a picture")+" (on the web)</a>";var p=joinPath(dir,u);return p?'<img alt="'+esc(alt)+'" data-p="'+esc(p)+'">':esc(alt);}};}
function codeFile(r,v,ref,w,f,rec){var key=gk(r,"files|"+ref),list=want(key,function(){return IngRepo.files(r.id,ref);});
  var dir=v.file.indexOf("/")>=0?v.file.replace(/[^/]+$/,""):"";v.dir=dir;crumbs(r,v,v.file,w,true);
  var isMd=/\.(md|markdown)$/i.test(v.file);if(v.mode==="prev"&&!isMd)v.mode="view";
  var seg=segBox("How to look at this file");
  (isMd?[["prev","Preview"]]:[]).concat([["view","Code"],["blame","Blame"],["hist","History"]]).forEach(function(m){var b=T("button",null,m[1]);b.type="button";b.setAttribute("aria-pressed",v.mode===m[0]?"true":"false");b.setAttribute("data-m",m[0]);b.onclick=function(){v.mode=m[0];repaint(true);};seg.appendChild(b);});
  var sb=h("div","h-bar h-blk");sb.appendChild(seg);if(v.qrun)sb.appendChild(rightOf(btn("quiet sm","Back to the search",function(){v.res=true;repaint(true);})));w.appendChild(sb);
  sig(r,"code|"+ref+"|"+v.file+"|"+v.mode);
  if(v.mode==="hist")return codeHist(r,v,ref,w,f);
  if(list===undefined)return waitBox(w,"Reading the file…");if(isErr(list))return errBox(w,list.__err,key);
  var fe=list.filter(function(x){return x.path===v.file;})[0];
  if(!fe){var nb=h("div","f-empty h-blk","<b>“"+esc(v.file)+"” is not in this version</b>It may have come later, or been taken away. Its History shows every version that held it.");w.appendChild(nb);
    f.appendChild(btn("","Its History",function(){v.mode="hist";repaint(true);}));f.appendChild(btn("","Back to the folder",function(){v.file=null;repaint(true);}));return;}
  if(v.mode==="blame")return codeBlame(r,v,ref,w,f);
  var tk="t|"+fe.oid,t=want(tk,function(){return textOf(fe.oid);});
  fileKeys(r,v,ref,fe,f);
  if(t===undefined)return waitBox(w,"Reading "+v.file.split("/").pop()+"…");if(isErr(t))return errBox(w,t.__err,tk);
  if(t==null){var pic=IMG.test(fe.path);var bx=h("div","f-diff h-file h-blk");bx.innerHTML='<div class="f-diff-h"><b>'+esc(fe.path)+"</b><span>"+kb(fe.size)+(pic?"":" · a binary file: kept whole, with no lines to show")+"</span></div>";
    if(pic){var pp=h("div","h-pic"),im=new Image();im.alt=fe.path;pp.appendChild(im);bx.appendChild(pp);blob(fe.oid).then(function(b){var u=URL.createObjectURL(new Blob([b],{type:/\.svg$/i.test(fe.path)?"image/svg+xml":"image/"+fe.path.split(".").pop().toLowerCase().replace("jpg","jpeg")}));im.src=u;setTimeout(function(){URL.revokeObjectURL(u);},120000);});}
    w.appendChild(bx);return;}
  if(v.mode==="prev"){var box=h("section","h-readme h-blk");box.innerHTML='<div class="h-readme-h">'+esc(fe.path.split("/").pop())+"<span>"+kb(fe.size)+"</span></div>";var mv=h("div","h-md");mv.id="hMdView";box.appendChild(mv);
    mdInto(mv,md(t,mdOpts(r,rec,repoMd(dir))),r,rec,ref);w.appendChild(box);return;}
  var lines=split(t),n=lines.length,showN=Math.max(v.show||2000,v.line?v.line+300:0),dv=h("div","f-diff h-file h-blk");
  dv.innerHTML='<div class="f-diff-h"><b>'+esc(fe.path)+"</b><span>"+plural(n,"line")+" · "+kb(fe.size)+"</span></div>";
  var pre=h("pre","f-dcode");pre.id="hFileView";pre.setAttribute("aria-label",fe.path+", "+plural(n,"line"));var frag=document.createDocumentFragment(),lim=Math.min(n,showN);
  for(var i=0;i<lim;i++){var d=document.createElement("div");d.className="f-dl h-ln"+(v.line===i+1?" h-hl":"");d.setAttribute("data-n",i+1);var ii=document.createElement("i");ii.textContent=String(i+1);d.appendChild(ii);d.appendChild(document.createTextNode(lines[i]));frag.appendChild(d);}
  pre.appendChild(frag);
  pre.addEventListener("click",function(e){var ii2=e.target.closest?e.target.closest(".h-ln i"):null;if(!ii2)return;var row=ii2.parentNode,nn=+row.getAttribute("data-n");[].forEach.call(pre.querySelectorAll(".h-hl"),function(x){x.classList.remove("h-hl");});
    if(v.line===nn){v.line=0;return;}v.line=nn;row.classList.add("h-hl");say("Line "+nn+" chosen.");});
  dv.appendChild(pre);w.appendChild(dv);
  if(lim<n){var mr=h("div","h-more h-blk");mr.appendChild(btn("sm","Show "+Math.min(4000,n-lim).toLocaleString("en-GB")+" more lines",function(){v.show=lim+4000;repaint();}));mr.appendChild(T("span","f-hint"," of "+n.toLocaleString("en-GB")));w.appendChild(mr);}
  if(v.line){setTimeout(function(){var el=pre.querySelector('[data-n="'+v.line+'"]');if(el){var top=el.offsetTop-pre.clientHeight/2;pre.scrollTop=Math.max(0,top);}},30);}}
function fileKeys(r,v,ref,fe,f){
  f.appendChild(btn("","Save a copy",function(){blob(fe.oid).then(function(b){var x=X(),nm=fe.path.split("/").pop();return x.saveBytes(nm,x.mimeOf?x.mimeOf(fe.path):"application/octet-stream",b).then(function(){toast("Saved: "+nm+".");});}).catch(fail);}));
  var here=onBranchHere(r,ref),ed=btn("",here?"Edit":"Edit (on the idea you work on)",function(){if(!here){toast("Editing is for the idea you are working on, "+(r.branch||"main")+": choose it above, or switch to this one in Ideas.");return;}X().openEditor(r,fe.path);});
  ed.setAttribute("data-k","edit");if(!here){ed.setAttribute("aria-disabled","true");ed.style.opacity=".6";ed.title="You can edit the files of "+(r.branch||"the idea you work on")+" only";}f.appendChild(ed);}

/* blame: for every line, the version that last changed it (as git blame: each version passes back to the one before it the
   lines it did not write, and keeps the rest); it looks back through 400 versions at most and says so */
function blame(r,ref,path){var LIM=400;
  return IngRepo.resolve(r.id,ref).then(function(top){return IngRepo.log(r.id,{ref:top,max:LIM}).then(function(log){var by={},kids={};log.forEach(function(c){by[c.oid]=c;});
    log.forEach(function(c){c.parents.forEach(function(p){if(by[p])kids[p]=(kids[p]||0)+1;});});
    return blobAt(by[top].tree,path).then(function(b0){if(!b0)throw new Error("“"+path+"” is not in this version");return textOf(b0).then(function(t0){
      if(t0==null)throw new Error("a binary file has no lines to look back through");
      if(t0.length>(window.ingFabMB?window.ingFabMB.blame:3)*1048576)throw new Error("this file is "+kb(t0.length)+": too large to look back through line by line here. Its History shows every version that changed it");
      var lines=split(t0),whoL=new Array(lines.length),Q={},ready=[top],left=lines.length,looked=0,older=0;Q[top]={blob:b0,map:lines.map(function(_,i){return [i,i];})};
      function give(p,pb,pairs){var q=Q[p]||(Q[p]={blob:pb,map:[]}),seen={};q.map.forEach(function(x){seen[x[1]]=1;});pairs.forEach(function(x){if(!seen[x[1]]){q.map.push(x);seen[x[1]]=1;}});}
      function childDone(p){if(!by[p])return;kids[p]--;if(kids[p]<=0)ready.push(p);}
      function step(){if(!ready.length||left<=0)return Promise.resolve();var oid=ready.shift(),c=by[oid],it=Q[oid];delete Q[oid];
        if(!it||!it.map.length){c.parents.forEach(childDone);return step();}looked++;
        return textOf(it.blob).then(function(text){var cl=split(text),rest=it.map,i=0;
          function nextParent(){if(i>=c.parents.length||!rest.length)return Promise.resolve();var p=c.parents[i++];
            return treeOf(p,by).then(function(pt){return blobAt(pt,path);}).then(function(pb){if(!pb)return nextParent();
              if(pb===it.blob){pass(p,pb,rest);rest=[];return;}
              return textOf(pb).then(function(ptx){if(ptx==null)return nextParent();var m=mapLines(split(ptx),cl),moved=[],stay=[];rest.forEach(function(x){var j=m[x[0]];if(j>=0)moved.push([j,x[1]]);else stay.push(x);});
                if(moved.length)pass(p,pb,moved);rest=stay;return nextParent();});});}
          function pass(p,pb,pairs){if(by[p])give(p,pb,pairs);else{pairs.forEach(function(x){if(!whoL[x[1]]){whoL[x[1]]="older";older++;left--;}});}}
          return nextParent().then(function(){rest.forEach(function(x){if(!whoL[x[1]]){whoL[x[1]]=oid;left--;}});c.parents.forEach(childDone);return step();});});}
      return step().then(function(){for(var k=0;k<whoL.length;k++)if(!whoL[k]){whoL[k]="older";older++;}
        return {lines:lines,who:whoL,by:by,looked:looked,total:log.length,older:older,cut:log.length>=LIM};});});});});});}
function codeBlame(r,v,ref,w,f){var key=gk(r,"blame|"+ref+"|"+v.file),b=want(key,function(){return blame(r,ref,v.file);});
  if(b===undefined)return waitBox(w,"Looking back through the versions for the one that last changed each line…");if(isErr(b))return errBox(w,b.__err,key);
  var nt=h("p","h-note2 h-blk");nt.id="hBlameNote";nt.textContent="Looked back through "+plural(b.total,"version")+(b.cut?", the newest of this idea's history":", all of this idea's history")+": "+plural(b.looked,"of them","of them")+" wrote lines that are still here."+(b.older?" "+plural(b.older,"line")+(b.older===1?" is":" are")+" older than the versions looked at.":"");
  w.appendChild(nt);
  var times=Object.keys(b.by).map(function(k){return b.by[k].when;}),t0=Math.min.apply(null,times),t1=Math.max.apply(null,times),box=h("div","h-blame h-blk");box.id="hBlame";
  var showN=Math.max(v.show||2000,2000),lim=Math.min(b.lines.length,showN),i=0;
  while(i<lim){var o=b.who[i],j=i;while(j<lim&&b.who[j]===o)j++;var row=h("div","h-bg"),c=o==="older"?null:b.by[o],m=document.createElement("button");m.type="button";m.className="h-bm"+(c?"":" old");
    if(c){m.innerHTML="<b>"+esc(c.title)+"</b><small>"+esc(c.short)+" · "+esc(when(c.when))+(c.author&&c.author.name?" · "+esc(c.author.name):"")+"</small>";m.style.setProperty("--age",String(t1>t0?0.25+0.75*(c.when-t0)/(t1-t0):1));m.title="See what this version changed";m.setAttribute("data-oid",c.oid);
      (function(c){m.onclick=function(){var cv=V(r).cmp;cv.a=c.parents[0]||"empty";cv.b=c.oid;cv.focus=v.file;show("compare");};})(c);}
    else{m.innerHTML="<b>Older</b><small>before the versions looked at</small>";m.disabled=true;m.style.setProperty("--age","0.12");}
    var bl=h("div","h-bl");for(var k=i;k<j;k++){var d=document.createElement("div");d.className="f-dl";var ii=document.createElement("i");ii.textContent=String(k+1);d.appendChild(ii);d.appendChild(document.createTextNode(b.lines[k]));bl.appendChild(d);}
    row.appendChild(m);row.appendChild(bl);box.appendChild(row);i=j;}
  w.appendChild(box);
  if(lim<b.lines.length){var mr=h("div","h-more h-blk");mr.appendChild(btn("sm","Show more lines",function(){v.show=lim+3000;repaint();}));w.appendChild(mr);}}
/* one file's history: each version in which it differs from every version before it (a merge that took one side as it was
   is not counted, as git does not) */
function fileHistory(r,ref,path){var LIM=400;return IngRepo.log(r.id,{ref:ref,max:LIM}).then(function(log){var by={};log.forEach(function(c){by[c.oid]=c;});
  return seq(log,function(c){return blobAt(c.tree,path).then(function(b){return Promise.all(c.parents.map(function(p){return treeOf(p,by).then(function(t){return blobAt(t,path);}).catch(function(){return null;});})).then(function(pbs){
      if(!c.parents.length)return b?{c:c,kind:"added"}:null;if(pbs.some(function(x){return x===b;}))return null;
      return {c:c,kind:!b?"taken away":pbs.every(function(x){return !x;})?"added":"changed"};});});}).then(function(list){return {list:list.filter(Boolean),looked:log.length,cut:log.length>=LIM};});});}
function codeHist(r,v,ref,w,f){var key=gk(r,"fhist|"+ref+"|"+v.file),hh=want(key,function(){return fileHistory(r,ref,v.file);});
  if(hh===undefined)return waitBox(w,"Finding every version that changed "+v.file.split("/").pop()+"…");if(isErr(hh))return errBox(w,hh.__err,key);
  var nt=h("p","h-note2 h-blk");nt.textContent=hh.list.length?plural(hh.list.length,"version")+" changed "+v.file+", of the "+plural(hh.looked,"version")+" looked at"+(hh.cut?" (the newest of this idea)":"")+".":"No version of this idea changed "+v.file+".";w.appendChild(nt);
  var box=h("div","h-vers h-blk");box.id="hFileHist";
  hh.list.forEach(function(x){var c=x.c,row=h("div","h-ver");row.style.cursor="default";row.innerHTML='<span class="t">'+esc(c.title)+'</span><span class="h-id">'+esc(c.short)+"</span><small>"+esc(x.kind)+" · "+esc(when(c.when))+"</small>";
    var k1=btn("quiet sm","What changed",function(){var cv=V(r).cmp;cv.a=c.parents[0]||"empty";cv.b=c.oid;cv.focus=v.file;show("compare");});
    var k2=btn("quiet sm","The file then",function(){v.ref=c.oid;v.mode=/\.(md|markdown)$/i.test(v.file)?"prev":"view";v.line=0;repaint(true);});if(x.kind==="taken away")k2.disabled=true;
    row.appendChild(k1);row.appendChild(k2);box.appendChild(row);});
  w.appendChild(box);}
/* the search: every text file of the version, line by line; a pattern between slashes is read as a regular expression */
function makeRe(q,cs){var m=/^\/(.+)\/([a-z]*)$/.exec(q),src=m?m[1]:q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),fl=(cs?"":"i");
  try{return {one:new RegExp(src,fl),all:new RegExp(src,fl+"g")};}catch(e){throw new Error("that pattern cannot be read ("+e.message.replace(/^Invalid regular expression: /,"")+")");}}
function search(r,ref,q,cs){var re;try{re=makeRe(q,cs);}catch(e){return Promise.reject(e);}
  return IngRepo.files(r.id,ref).then(function(list){var out=[],total=0,searched=0,skipped=0,CAP=(window.ingFabMB?window.ingFabMB.files:2000);
    return seq(list,function(f){if(total>=CAP)return;if(BIN.test(f.path)||f.size>(window.ingFabMB?window.ingFabMB.search:8)*1048576){skipped++;return;}return textOf(f.oid).then(function(t){if(t==null){skipped++;return;}searched++;
      var ls=t.split("\n"),hits=[];for(var i=0;i<ls.length&&total<CAP;i++){if(re.one.test(ls[i])){hits.push(i+1);total++;}}
      if(hits.length)out.push({path:f.path,hits:hits,lines:hits.slice(0,12).map(function(n){return ls[n-1];})});});}).then(function(){return {files:out,total:total,searched:searched,skipped:skipped,capped:total>=CAP,re:re};});});}
function marked(line,re){var s=String(line),first=-1,m;re.all.lastIndex=0;var spans=[];while((m=re.all.exec(s))){if(!m[0].length){re.all.lastIndex++;continue;}spans.push([m.index,m.index+m[0].length]);if(first<0)first=m.index;if(spans.length>40)break;}
  var from=0,pre="";if(s.length>260&&first>60){from=first-60;pre="…";}var to=Math.min(s.length,from+400),out=pre,p=from;
  spans.forEach(function(sp){if(sp[0]<from||sp[0]>=to)return;out+=esc(s.slice(p,sp[0]))+'<mark class="h-mk">'+esc(s.slice(sp[0],Math.min(sp[1],to)))+"</mark>";p=Math.min(sp[1],to);});
  out+=esc(s.slice(p,to))+(to<s.length?"…":"");return out;}
function codeSearch(r,v,ref,w,f,rec){var qq=v.qrun,key=gk(r,"search|"+ref+"|"+(qq.cs?1:0)+"|"+qq.q),res=want(key,function(){return search(r,ref,qq.q,qq.cs);});sig(r,"search|"+key);
  /* the way out is there while it searches and when a pattern cannot be read, not only beside results */
  f.appendChild(btn("","Close the search",function(){v.res=false;v.qrun=null;v.q="";repaint(true);}));
  if(res===undefined)return waitBox(w,"Searching every file at "+refLabel(ref)+" for “"+qq.q+"”…");if(isErr(res))return errBox(w,res.__err,key);
  var nt=h("p","h-note2 h-blk");nt.id="hSearchNote";nt.textContent=(res.total?plural(res.total,"line")+" in "+plural(res.files.length,"file"):"Nothing found")+" for “"+qq.q+"” at "+refLabel(ref)+", in "+plural(res.searched,"file")+" searched"+(res.skipped?" ("+plural(res.skipped,"picture or other binary file","pictures and other binary files")+" left out)":"")+"."+(res.capped?" The first 2,000 lines found are shown.":"");w.appendChild(nt);
  res.files.forEach(function(x){var box=h("div","h-res h-blk"),hd=h("div","h-res-h");hd.appendChild(T("span",null,x.path));hd.appendChild(T("span","f-chip",plural(x.hits.length,"line")));box.appendChild(hd);
    x.lines.forEach(function(l,i){var n=x.hits[i],b=h("button","h-res-l","<i>"+n+"</i><span>"+marked(l,res.re)+"</span>");b.type="button";b.setAttribute("aria-label",x.path+", line "+n);
      b.onclick=function(){v.file=x.path;v.mode="view";v.line=n;v.res=false;v.show=2000;repaint(true);};box.appendChild(b);});
    if(x.hits.length>x.lines.length){var more=btn("quiet sm","and "+plural(x.hits.length-x.lines.length,"more line")+" in this file",function(){v.file=x.path;v.mode="view";v.line=x.hits[x.lines.length];v.res=false;repaint(true);});more.style.margin="4px 8px 8px";box.appendChild(more);}
    w.appendChild(box);});}

/* ======================= ISSUES ======================= */
function needRec(r,w,what){var rec=recOf(r);if(rec)return rec;
  if(RECERR[r.id]){var e=h("div","f-empty h-blk","<b>Fabrica's notes for this app could not be read</b>"+esc(cap(RECERR[r.id].message||String(RECERR[r.id]))));var k=btn("sm","Try again",function(){delete RECERR[r.id];repaint(true);});e.appendChild(h("br"));e.appendChild(k);w.appendChild(e);return null;}
  waitBox(w,"Reading "+what+"…");return null;}
var SCANT={};function scanSoon(r){clearTimeout(SCANT[r.id]);SCANT[r.id]=setTimeout(function(){scan(r).then(function(x){if(x.changed)repaint();},function(){});},40);}
function backBar(w,label,fn){var b=h("div","h-bar h-blk"),k=btn("quiet sm","‹ "+label,fn);k.setAttribute("data-k","back");b.appendChild(k);w.appendChild(b);return b;}
function segOf(label,list,val,on){var seg=segBox(label);
  list.forEach(function(s){var b=h("button",null,esc(s[1])+(s[2]!=null?'<span class="n">'+s[2]+"</span>":""));b.type="button";b.setAttribute("data-s",s[0]);b.setAttribute("aria-pressed",val===s[0]?"true":"false");b.onclick=function(){on(s[0]);};seg.appendChild(b);});return seg;}
function matchQ(it,q,rec){q=String(q||"").trim().toLowerCase();if(!q)return true;var words=q.split(/\s+/),hay=[it.title,it.body].concat(it.comments.map(function(c){return c.body;})).join("\n").toLowerCase();
  return words.every(function(wd){var m=/^label:(.+)$/.exec(wd);if(m)return it.labels.some(function(l){return l.toLowerCase()===m[1];});m=/^is:(open|closed|merged)$/.exec(wd);if(m)return it.state===m[1]||(m[1]==="closed"&&it.state==="merged");
    m=/^#?(\d+)$/.exec(wd);if(m&&+m[1]===it.n)return true;return hay.indexOf(wd)>=0;});}
function paintIssues(r,w,f){var rec=needRec(r,w,"the issues");if(!rec)return;scanSoon(r);var v=V(r).iss;
  if(v.open==="new")return issueNew(r,rec,v,w,f);
  if(v.open!=null){var it=issueN(rec,v.open);if(it)return issueOne(r,rec,it,v,w,f);v.open=null;}
  sig(r,"issues");
  var nOpen=rec.issues.filter(function(x){return x.state==="open";}).length,nShut=rec.issues.length-nOpen;
  var bar=h("div","h-bar h-blk");bar.appendChild(segOf("Open or closed",[["open","Open",nOpen],["closed","Closed",nShut]],v.st,function(s){v.st=s;repaint(true);}));
  var q=h("input","h-grow");q.type="search";q.placeholder="Search: words, label:bug, #3";q.setAttribute("aria-label","Search the issues");q.value=v.q;q.id="hIssQ";bar.appendChild(q);
  var nb=btn("pri","New issue",function(){v.open="new";repaint(true);});nb.id="hIssNew";bar.appendChild(nb);w.appendChild(bar);
  var chips=h("div","h-chips h-filt h-blk"+(v.lab?"":" h-all"));chips.setAttribute("role","group");chips.setAttribute("aria-label","Show one label only");
  rec.labels.forEach(function(l){var c=labChip(rec,l.name,"button");c.type="button";c.setAttribute("aria-pressed",v.lab===l.name?"true":"false");c.onclick=function(){v.lab=v.lab===l.name?"":l.name;repaint(true);};chips.appendChild(c);});
  if(rec.labels.length)w.appendChild(chips);
  var list=h("div","h-list h-blk");list.id="hIssList";list.setAttribute("role","list");w.appendChild(list);
  function draw(){list.innerHTML="";var rows=rec.issues.filter(function(x){return (x.state===v.st)&&(!v.lab||x.labels.indexOf(v.lab)>=0)&&matchQ(x,v.q,rec);}).sort(function(a,b){return b.n-a.n;});
    if(!rec.issues.length){list.appendChild(h("div","f-empty","<b>No issues yet</b>An issue is a note of something to fix, to add or to find out. Each one gets a number, #1, #2 and on, shared with pull requests; a version kept with “fixes #1” in its message closes it once it is in "+esc(defBranch(r,rec))+"."));return;}
    if(!rows.length){list.appendChild(h("div","f-empty",v.q||v.lab?"No "+v.st+" issue matches.":v.st==="open"?"<b>Nothing open</b>Every issue is closed.":"No closed issue yet."));return;}
    rows.forEach(function(x,i){var b=h("button","h-item");b.type="button";b.setAttribute("role","listitem");b.setAttribute("data-n",x.n);b.style.animationDelay=Math.min(i,12)*0.03+"s";
      b.innerHTML=icOf(x)+'<span class="t"></span>'+(x.comments.length?'<span class="c">'+IC.talk+x.comments.length+"</span>":"<span></span>")+'<span class="m"></span>';
      var t=b.querySelector(".t");t.appendChild(document.createTextNode(x.title+" "));x.labels.forEach(function(l){t.appendChild(labChip(rec,l));});
      b.querySelector(".m").textContent="#"+x.n+" "+(x.state==="open"?"opened "+when(x.created):"closed "+when(x.closedAt)+(x.closedBy&&x.closedBy.kind==="version"?" by version "+x.closedBy.short:x.closedBy&&x.closedBy.kind==="pr"?" by pull request #"+x.closedBy.n:""));
      b.setAttribute("aria-label","Issue "+x.n+", "+x.state+": "+x.title);b.onclick=function(){v.open=x.n;repaint(true);};list.appendChild(b);});}
  draw();q.oninput=function(){v.q=q.value;draw();};}
function newItem(rec,kind,o){var n=rec.next++,it={n:n,kind:kind,title:o.title,body:o.body||"",state:"open",labels:o.labels||[],created:Date.now(),updated:Date.now(),by:who(),comments:[],events:[],refs:[]};
  if(kind==="pr"){it.from=o.from;it.to=o.to;it.lastBase=o.base||null;it.lastHead=o.head||null;rec.pulls.push(it);}else rec.issues.push(it);return it;}
function labelPick(rec,chosen,label){var lr=h("div","h-chips");lr.style.padding="0";lr.setAttribute("role","group");lr.setAttribute("aria-label",label||"Labels");
  if(!rec.labels.length)lr.appendChild(T("span","h-empty-n","No labels yet: make some in Settings."));
  rec.labels.forEach(function(l){var c=labChip(rec,l.name,"button");c.type="button";c.setAttribute("aria-pressed",chosen.indexOf(l.name)>=0?"true":"false");c.onclick=function(){var i=chosen.indexOf(l.name);if(i>=0)chosen.splice(i,1);else chosen.push(l.name);c.setAttribute("aria-pressed",i>=0?"false":"true");};lr.appendChild(c);});return lr;}
function issueNew(r,rec,v,w,f){sig(r,"issue-new");backBar(w,"All issues",function(){v.open=null;repaint(true);});
  var form=h("div","h-form h-blk");form.appendChild(T("h3","h-sub","A new issue")).style.margin="0";
  var tl=h("label");tl.appendChild(T("span",null,"Its title"));var ti=h("input");ti.type="text";ti.id="hIsT";ti.placeholder="What is it, in a few words?";ti.value=v.dT||"";tl.appendChild(ti);form.appendChild(tl);
  var c=composer({id:"hIsB",label:"What happened, or what you would like",value:v.dB||"",r:r,rec:rec,mdo:mdOpts(r,rec,{breaks:true}),rows:7,oninput:function(x){v.dB=x;}});c.el.style.padding="0";form.appendChild(c.el);
  var chosen=v.dL||(v.dL=[]);form.appendChild(T("span","f-hint","Its labels")).style.margin="0";form.appendChild(labelPick(rec,chosen,"Its labels"));w.appendChild(form);
  ti.oninput=function(){v.dT=ti.value;};setTimeout(function(){ti.focus();},60);
  f.appendChild(btn("","Cancel",function(){v.open=null;v.dT=v.dB="";v.dL=[];repaint(true);}));
  var go=btn("pri","Open the issue",function(){var t=ti.value.trim();if(!t){ti.focus();toast("A title first: what is it, in a few words?");return;}
    go.disabled=true;var it=newItem(rec,"issue",{title:t.slice(0,240),body:c.get(),labels:chosen.slice()});keep(rec).then(function(){v.open=it.n;v.dT=v.dB="";v.dL=[];toast("Issue #"+it.n+" is open.");repaint(true);},function(){go.disabled=false;});});
  go.id="hIsGo";go.style.marginLeft="auto";f.appendChild(go);}
function evLine(cls,html,at){var e=h("div","h-ev "+(cls||""),html+(at?" <small>"+esc(when(at))+"</small>":""));return e;}
function versionBtn(r,oid,short,title){var b=T("button","h-link","version "+short+(title?" “"+title+"”":""));b.type="button";b.onclick=function(){IngRepo.log(r.id,{ref:oid,max:1}).then(function(l){var c=l[0];var cv=V(r).cmp;cv.a=c&&c.parents[0]||"empty";cv.b=oid;cv.focus=null;show("compare");},fail);};return b;}
function prBtn(r,n,title){var b=T("button","h-link","pull request #"+n+(title?" “"+title+"”":""));b.type="button";b.onclick=function(){openItem(r,n);};return b;}
function cmtCard(r,rec,c,cls,head){var e=h("article","h-cmt "+(cls||"")),hd=h("div","h-cmt-h");hd.innerHTML="<b>"+esc(c.by||who())+"</b><span>"+esc(head||"wrote")+"</span><span>"+esc(when(c.at))+"</span>";e.appendChild(hd);
  var b=h("div","h-md");mdInto(b,c.body&&c.body.trim()?md(c.body,mdOpts(r,rec,{breaks:true})):'<p class="h-empty-n">No words given.</p>',r,rec);e.appendChild(b);return {el:e,head:hd};}
function issueOne(r,rec,it,v,w,f){sig(r,"issue|"+it.n);backBar(w,"All issues",function(){v.open=null;repaint(true);});
  var hd=h("div","h-head h-blk"),t=h("h3");t.id="hIsTitle";t.appendChild(document.createTextNode(it.title+" "));t.appendChild(T("em",null,"#"+it.n));hd.appendChild(t);
  hd.appendChild(h("span","h-state "+(it.state==="open"?"open":"closed"),icOf(it).replace('class="h-ic','class="h-ic x')+(it.state==="open"?"Open":"Closed")));
  hd.appendChild(btn("sm","Edit the title",function(){askLine("The title of #"+it.n,null,it.title,function(val){it.events.push({at:Date.now(),kind:"title",from:it.title,to:val});it.title=val.slice(0,240);it.updated=Date.now();return keep(rec).then(function(){repaint(true);});});}));w.appendChild(hd);
  var meta=h("div","h-meta h-blk");meta.appendChild(T("span",null,(it.by||who())+" opened it "+when(it.created)+" · "+plural(it.comments.length,"comment")));
  it.labels.forEach(function(l){meta.appendChild(labChip(rec,l));});
  var lk=btn("quiet sm","Labels",function(){var chosen=it.labels.slice(),sh=X().sheet("The labels of #"+it.n,"Press a label to give it, or to take it away.");sh.box.appendChild(labelPick(rec,chosen));
    var end=h("div","end");end.appendChild(btn("","Close",sh.close));end.appendChild(btn("pri","Done",function(){var add=chosen.filter(function(l){return it.labels.indexOf(l)<0;}),del=it.labels.filter(function(l){return chosen.indexOf(l)<0;});
      if(add.length||del.length){it.events.push({at:Date.now(),kind:"labels",add:add,del:del});it.labels=chosen;it.updated=Date.now();keep(rec).then(function(){repaint(true);});}sh.close();}));sh.box.appendChild(end);});lk.id="hIsLabels";meta.appendChild(lk);w.appendChild(meta);
  var tl=h("div","h-tl h-blk");tl.id="hIsTl";
  var first=cmtCard(r,rec,{by:it.by,at:it.created,body:it.body},"","opened it");var eb=btn("quiet sm","Edit",function(){askText("What #"+it.n+" says",null,it.body,function(val){it.body=val;it.updated=Date.now();return keep(rec).then(function(){repaint(true);});},r,rec);});
  eb.classList.add("h-right");first.head.appendChild(eb);tl.appendChild(first.el);
  var evs=[];it.comments.forEach(function(c){evs.push({at:c.at,c:c});});it.events.forEach(function(e){evs.push({at:e.at,e:e});});it.refs.forEach(function(x){evs.push({at:x.at,ref:x});});
  prsMentioning(rec,it.n).forEach(function(p){evs.push({at:p.created,pr:p});});
  evs.sort(function(a,b){return a.at-b.at;}).forEach(function(x){if(x.c){tl.appendChild(cmtCard(r,rec,x.c).el);return;}
    if(x.ref){var e=evLine("acc","Mentioned in ",x.ref.at);e.insertBefore(versionBtn(r,x.ref.oid,x.ref.short,x.ref.title),e.lastChild.previousSibling||null);if(x.ref.idea)e.insertBefore(document.createTextNode(" on "+x.ref.idea+" "),e.querySelector("small"));tl.appendChild(e);return;}
    if(x.pr){var e2=evLine("acc","Mentioned in ",x.at);e2.insertBefore(prBtn(r,x.pr.n,x.pr.title),e2.querySelector("small"));tl.appendChild(e2);return;}
    var ev=x.e;if(ev.kind==="closed"){var e3=evLine("acc","Closed"+(ev.by&&(ev.by.kind==="version"||ev.by.kind==="pr")?" by ":""),ev.at);if(ev.by&&ev.by.kind==="version")e3.insertBefore(versionBtn(r,ev.by.oid,ev.by.short,ev.by.title),e3.querySelector("small"));
        else if(ev.by&&ev.by.kind==="pr")e3.insertBefore(prBtn(r,ev.by.n),e3.querySelector("small"));tl.appendChild(e3);return;}
    if(ev.kind==="reopened"){tl.appendChild(evLine("ok","Reopened",ev.at));return;}
    if(ev.kind==="labels"){tl.appendChild(evLine("",esc((ev.add.length?"Labels given: "+ev.add.join(", "):"")+(ev.add.length&&ev.del.length?"; ":"")+(ev.del.length?"taken away: "+ev.del.join(", "):"")),ev.at));return;}
    if(ev.kind==="title"){tl.appendChild(evLine("","The title was “"+esc(ev.from)+"”",ev.at));}});
  w.appendChild(tl);
  var men=it.refs.length+prsMentioning(rec,it.n).length;if(men){var mh=T("h3","h-sub h-blk","Mentioned in");w.appendChild(mh);var ml=h("div","h-vers h-blk");ml.id="hIssMent";
    it.refs.forEach(function(x){var row=h("div","h-ver");row.style.cursor="default";row.innerHTML='<span class="t">'+esc(x.title)+'</span><span class="h-id">'+esc(x.short)+"</span><small>a version"+(x.idea?" on "+esc(x.idea):"")+"</small>";row.appendChild(versionBtn(r,x.oid,"","")).textContent="Look";ml.appendChild(row);});
    prsMentioning(rec,it.n).forEach(function(p){var row=h("div","h-ver");row.style.cursor="default";row.innerHTML=icOf(p)+'<span class="t">'+esc(p.title)+'</span><small>pull request #'+p.n+"</small>";row.appendChild(prBtn(r,p.n)).textContent="Open";ml.appendChild(row);});w.appendChild(ml);}
  var c=composer({id:"hIsC",label:"A comment",r:r,rec:rec,mdo:mdOpts(r,rec,{breaks:true}),rows:4,value:v.dC||"",oninput:function(x){v.dC=x;},onSubmit:function(){cm.click();}});c.el.classList.add("h-blk");w.appendChild(c.el);
  var row=h("div","f-row");c.el.appendChild(row);
  function comment(){var t=c.get().trim();if(!t)return false;it.comments.push({at:Date.now(),by:who(),body:t});it.updated=Date.now();v.dC="";return true;}
  if(it.state==="open"){var cl=btn("","Close the issue",function(){var had=comment();closeIssue(it,{kind:"hand"});syncBoard(rec);keep(rec).then(function(){toast("Issue #"+it.n+" is closed"+(had?", with your comment.":"."));repaint(true);});});cl.id="hIsClose";
    c.ta.addEventListener("input",function(){cl.textContent=c.get().trim()?"Close with comment":"Close the issue";});row.appendChild(cl);}
  else{var ro=btn("","Reopen",function(){comment();reopenIssue(it);keep(rec).then(function(){toast("Issue #"+it.n+" is open again.");repaint(true);});});ro.id="hIsReopen";row.appendChild(ro);}
  var cm=btn("pri","Comment",function(){if(!comment()){c.focus();toast("A few words first.");return;}keep(rec).then(function(){repaint(true);});});cm.id="hIsCm";row.appendChild(cm);
  var del=btn("quiet","Delete this issue",function(){ask("Delete issue #"+it.n+"?","Its words, comments and labels go. Its number is not given again.","Delete it",true).then(function(y){if(!y)return;rec.issues=rec.issues.filter(function(x){return x!==it;});syncBoard(rec);keep(rec).then(function(){v.open=null;toast("Issue #"+it.n+" is deleted.");repaint(true);});});});
  del.style.color="var(--f-del)";f.appendChild(del);}

/* ======================= PULL REQUESTS: one idea brought into another ======================= */
function prInfo(r,from,to){return Promise.all([IngRepo.resolve(r.id,"refs/heads/"+from),IngRepo.resolve(r.id,"refs/heads/"+to)]).then(function(x){return between(r,x[1],x[0]).then(function(b){b.fromOid=x[0];b.toOid=x[1];b.files=0;b.both=[];
  if(!b.base||!b.ahead.length)return b;
  return Promise.all([IngRepo.diff(r.id,{from:b.base,to:x[0],namesOnly:true}),IngRepo.diff(r.id,{from:b.base,to:x[1],namesOnly:true})]).then(function(d){var A={};d[0].forEach(function(c){A[c.path]=1;});b.files=d[0].length;b.both=d[1].filter(function(c){return A[c.path];}).map(function(c){return c.path;});return b;});});});}
/* the idea a new pull request starts from, as GitHub offers the branch just pushed: the one worked on if it has versions the
   target lacks, otherwise the idea with something to bring in whose newest version is newest (twelve looked at, at most) */
function pickFrom(r,to){var bs=r.branches.filter(function(b){return b!==to;});if(!bs.length)return Promise.resolve(null);
  return IngRepo.resolve(r.id,"refs/heads/"+to).then(function(toOid){return seq(bs.slice(0,12),function(b){return IngRepo.log(r.id,{ref:"refs/heads/"+b,max:1}).then(function(l){var tip=l[0];if(!tip||!toOid)return null;
      return between(r,toOid,tip.oid).then(function(x){return {b:b,n:x.ahead.length,when:tip.when};});}).catch(function(){return null;});});})
    .then(function(list){list=list.filter(function(x){return x&&x.n>0;});if(!list.length)return null;var mine=list.filter(function(x){return x.b===r.branch&&!r.detached;})[0];if(mine)return mine.b;
      return list.sort(function(a,b){return b.when-a.when;})[0].b;});}
function reviewState(p){var last=null;p.comments.forEach(function(c){if(c.kind==="approve"||c.kind==="changes")last=c.kind;});return last;}
function paintPulls(r,w,f){var rec=needRec(r,w,"the pull requests");if(!rec)return;scanSoon(r);var v=V(r).pr;
  if(v.open==="new")return prNew(r,rec,v,w,f);
  if(v.open!=null){var p=pullN(rec,v.open);if(p)return prOne(r,rec,p,v,w,f);v.open=null;}
  sig(r,"pulls");
  var nOpen=rec.pulls.filter(function(x){return x.state==="open";}).length,nShut=rec.pulls.length-nOpen;
  var bar=h("div","h-bar h-blk");bar.appendChild(segOf("Open or closed",[["open","Open",nOpen],["closed","Closed",nShut]],v.st,function(s){v.st=s;repaint(true);}));
  var q=h("input","h-grow");q.type="search";q.placeholder="Search the pull requests";q.setAttribute("aria-label","Search the pull requests");q.value=v.q;q.id="hPrQ";bar.appendChild(q);
  var nb=btn("pri","New pull request",function(){v.open="new";v.form=null;repaint(true);});nb.id="hPrNew";bar.appendChild(nb);w.appendChild(bar);
  var list=h("div","h-list h-blk");list.id="hPrList";list.setAttribute("role","list");w.appendChild(list);
  function draw(){list.innerHTML="";var rows=rec.pulls.filter(function(x){return (v.st==="open"?x.state==="open":x.state!=="open")&&matchQ(x,v.q,rec);}).sort(function(a,b){return b.n-a.n;});
    if(!rec.pulls.length){list.appendChild(h("div","f-empty","<b>No pull requests yet</b>A pull request asks to bring one idea into another: its versions, its files changed line by line, and what you think of them, in one place. When it is right, merge it."));return;}
    if(!rows.length){list.appendChild(h("div","f-empty",v.q?"No pull request matches.":v.st==="open"?"<b>Nothing open</b>Every pull request is merged or closed.":"None is merged or closed yet."));return;}
    rows.forEach(function(x,i){var b=h("button","h-item");b.type="button";b.setAttribute("role","listitem");b.setAttribute("data-n",x.n);b.style.animationDelay=Math.min(i,12)*0.03+"s";var rv=reviewState(x);
      b.innerHTML=icOf(x)+'<span class="t">'+esc(x.title)+(rv&&x.state==="open"?' <span class="f-chip '+(rv==="approve"?"ok":"warn")+'" style="font-size:11px;padding:1px 8px">'+(rv==="approve"?"Approved":"Changes asked for")+"</span>":"")+"</span>"+(x.comments.length?'<span class="c">'+IC.talk+x.comments.length+"</span>":"<span></span>")+'<span class="m"></span>';
      b.querySelector(".m").textContent="#"+x.n+" · "+x.from+" into "+x.to+" · "+(x.state==="open"?"opened "+when(x.created):x.state==="merged"?"merged "+when(x.merged&&x.merged.at):"closed "+when(x.closedAt));
      b.setAttribute("aria-label","Pull request "+x.n+", "+x.state+": "+x.title);b.onclick=function(){v.open=x.n;v.tab="conv";repaint(true);};list.appendChild(b);});}
  draw();q.oninput=function(){v.q=q.value;draw();};}
function branchOpts(r,skip){return r.branches.slice().sort(function(a,b){return a==="main"?-1:b==="main"?1:a.localeCompare(b);}).filter(function(b){return b!==skip;}).map(function(b){return {v:b,t:b};});}
function prNew(r,rec,v,w,f){sig(r,"pr-new");backBar(w,"All pull requests",function(){v.open=null;repaint(true);});
  if(r.branches.length<2){var e=h("div","f-empty h-blk","<b>A pull request needs two ideas</b>Start a new idea in Ideas, keep a version on it, and come back: it can then ask to be brought into "+esc(defBranch(r,rec))+".");w.appendChild(e);
    f.appendChild(btn("pri","Go to Ideas",function(){show("ideas");}));return;}
  var fm=v.form||(v.form={from:null,to:null,title:"",body:""});if(!fm.to||r.branches.indexOf(fm.to)<0)fm.to=defBranch(r,rec);
  if(!fm.from||r.branches.indexOf(fm.from)<0||fm.from===fm.to){var pk0=want(gk(r,"prpick|"+fm.to),function(){return pickFrom(r,fm.to);});
    if(pk0===undefined){f.appendChild(btn("","Cancel",function(){v.open=null;v.form=null;repaint(true);}));return waitBox(w,"Looking for an idea with something to bring in…");}
    fm.from=pk0&&!isErr(pk0)&&pk0!==fm.to&&r.branches.indexOf(pk0)>=0?pk0:(r.branch&&r.branch!==fm.to)?r.branch:branchOpts(r,fm.to)[0].v;}
  var form=h("div","h-form h-blk");form.appendChild(T("h3","h-sub","A new pull request")).style.margin="0";
  var pk=h("div","h-pick");pk.style.padding="0";var la=h("label");la.appendChild(T("span",null,"Bring the idea"));var sa=picker(branchOpts(r,null),fm.from,"The idea to bring in",function(x){fm.from=x;repaint(true);});sa.id="hPrFrom";la.appendChild(sa);
  var lb=h("label");lb.appendChild(T("span",null,"into"));var sb=picker(branchOpts(r,null),fm.to,"The idea it goes into",function(x){fm.to=x;repaint(true);});sb.id="hPrTo";lb.appendChild(sb);
  pk.appendChild(la);pk.appendChild(T("span","f-hint","→")).style.margin="0 0 8px";pk.appendChild(lb);form.appendChild(pk);
  var key=gk(r,"prinfo|"+fm.from+"|"+fm.to),info=fm.from===fm.to?{same:true}:want(key,function(){return prInfo(r,fm.from,fm.to);}),line=h("div","h-box");line.id="hPrInfo";line.style.margin="0";
  var dup=rec.pulls.filter(function(p){return p.state==="open"&&p.from===fm.from&&p.to===fm.to;})[0];
  if(info&&info.same)line.textContent="Choose two different ideas.";else if(info===undefined)line.textContent="Looking at both ideas…";else if(isErr(info))line.textContent=cap(info.__err);
  else if(!info.base)line.textContent="These two ideas share no version, so one cannot be brought into the other.";
  else if(!info.ahead.length){line.className="h-box warn";line.textContent="Nothing to bring in: "+fm.to+" already has every version of "+fm.from+".";}
  else{line.className="h-box ok";line.textContent=plural(info.ahead.length,"version")+" to bring in, "+plural(info.files,"file")+" changed."+(info.both.length?" "+plural(info.both.length,"file")+" also changed in "+fm.to+": Fabrica joins them line by line when you merge.":" Nothing in "+fm.to+" crossed them: it comes in cleanly.");}
  form.appendChild(line);
  if(dup){var dn=h("div","h-box warn","Pull request #"+dup.n+" already asks for this.");dn.style.margin="0";dn.appendChild(document.createTextNode(" "));dn.appendChild(prBtn(r,dup.n,"")).textContent="Open it";form.appendChild(dn);}
  var defT=info&&!isErr(info)&&info.ahead&&info.ahead.length===1?info.ahead[0].title:fm.from.replace(/[-_]+/g," ").replace(/^./,function(c){return c.toUpperCase();});
  var tl=h("label");tl.appendChild(T("span",null,"Its title"));var ti=h("input");ti.type="text";ti.id="hPrT";ti.placeholder=defT;ti.value=fm.title;tl.appendChild(ti);form.appendChild(tl);ti.oninput=function(){fm.title=ti.value;};
  var c=composer({id:"hPrB",label:"What it does, and why",value:fm.body,r:r,rec:rec,mdo:mdOpts(r,rec,{breaks:true}),rows:6,oninput:function(x){fm.body=x;},ph:"What it changes, and why. “Fixes #3” here closes issue 3 when it is merged."});c.el.style.padding="0";form.appendChild(c.el);
  w.appendChild(form);
  f.appendChild(btn("","Cancel",function(){v.open=null;v.form=null;repaint(true);}));
  var go=btn("pri","Open the pull request",function(){if(fm.from===fm.to){toast("Choose two different ideas.");return;}if(dup){toast("Pull request #"+dup.n+" already asks for this.");return;}go.disabled=true;
    (info&&!isErr(info)&&info.ahead?Promise.resolve(info):prInfo(r,fm.from,fm.to)).then(function(inf){if(!inf.base)throw new Error("these two ideas share no version");if(!inf.ahead.length)throw new Error(fm.to+" already has every version of "+fm.from+": there is nothing to bring in");
      var p=newItem(rec,"pr",{title:(ti.value.trim()||ti.placeholder).slice(0,240),body:c.get(),from:fm.from,to:fm.to,base:inf.base,head:inf.fromOid});return keep(rec).then(function(){v.open=p.n;v.tab="conv";v.form=null;toast("Pull request #"+p.n+" is open.");repaint(true);});}).catch(function(e){go.disabled=false;fail(e);});});
  go.id="hPrGo";go.style.marginLeft="auto";f.appendChild(go);}
function prOne(r,rec,p,v,w,f){sig(r,"pr|"+p.n+"|"+v.tab);
  if(p.pending&&!r.merging&&p.state==="open"){p.pending=null;p.events.push({at:Date.now(),kind:"stopped"});keep(rec);}
  backBar(w,"All pull requests",function(){v.open=null;repaint(true);});
  var live=p.state==="open"&&r.branches.indexOf(p.from)>=0&&r.branches.indexOf(p.to)>=0,key=gk(r,"prinfo|"+p.from+"|"+p.to),info=live?want(key,function(){return prInfo(r,p.from,p.to);}):null;
  if(info&&!isErr(info)&&info.base&&(p.lastBase!==info.base||p.lastHead!==info.fromOid)){p.lastBase=info.base;p.lastHead=info.fromOid;keep(rec);}
  var base=p.state==="merged"&&p.merged?(p.merged.base||p.lastBase):(info&&!isErr(info)?info.base:p.lastBase),head=p.state==="merged"&&p.merged?p.merged.head:(info&&!isErr(info)?info.fromOid:p.lastHead);
  var hd=h("div","h-head h-blk"),t=h("h3");t.id="hPrTitle";t.appendChild(document.createTextNode(p.title+" "));t.appendChild(T("em",null,"#"+p.n));hd.appendChild(t);
  hd.appendChild(h("span","h-state "+(p.state==="open"?"open":p.state==="merged"?"merged":"shut"),icOf(p)+(p.state==="open"?"Open":p.state==="merged"?"Merged":"Closed")));
  hd.appendChild(btn("sm","Edit the title",function(){askLine("The title of #"+p.n,null,p.title,function(val){p.events.push({at:Date.now(),kind:"title",from:p.title,to:val});p.title=val.slice(0,240);return keep(rec).then(function(){repaint(true);});});}));w.appendChild(hd);
  var vers=want(gk(r,"prv|"+(base||"")+"|"+(head||"")),function(){return base&&head?between(r,base,head).then(function(b){return b.ahead;}):Promise.resolve([]);});
  var nv=vers&&!isErr(vers)?vers.length:null,rv=reviewState(p);
  var meta=h("div","h-meta h-blk");meta.appendChild(T("span",null,p.state==="merged"?(p.merged&&p.merged.by||who())+" merged "+(nv!=null?plural(nv,"version"):"its versions")+" from "+p.from+" into "+p.to+", "+when(p.merged&&p.merged.at):
    (p.by||who())+(p.state==="open"?" wants to bring ":" asked to bring ")+(nv!=null?plural(nv,"version"):"versions")+" from "+p.from+" into "+p.to));
  if(rv)meta.appendChild(h("span","f-chip "+(rv==="approve"?"ok":"warn"),'<span class="d"></span>'+(rv==="approve"?"Approved":"Changes asked for")));w.appendChild(meta);
  var tabs=h("div","h-bar h-blk");tabs.appendChild(segOf("Parts of the pull request",[["conv","Conversation",p.comments.length||null],["vers","Versions",nv],["files","Files changed",null]],v.tab,function(s){v.tab=s;var x=X();if(x)x.S.file=0;repaint(true);}));w.appendChild(tabs);
  if(v.tab==="vers"){if(vers===undefined)return waitBox(w,"Reading its versions…");if(isErr(vers))return errBox(w,vers.__err,gk(r,"prv|"+base+"|"+head));
    if(!vers.length){w.appendChild(h("div","f-empty h-blk",p.state==="merged"?"Its versions are in "+esc(p.to)+".":"No version to bring in."));return;}
    var box=h("div","h-vers h-blk");box.id="hPrVers";vers.forEach(function(c){var b=h("button","h-ver");b.type="button";b.innerHTML='<span class="t">'+esc(c.title)+'</span><span class="h-id">'+esc(c.short)+"</span><small>"+esc(when(c.when))+"</small>";
      b.onclick=function(){var cv=V(r).cmp;cv.a=c.parents[0]||"empty";cv.b=c.oid;cv.focus=null;show("compare");};box.appendChild(b);});w.appendChild(box);return;}
  if(v.tab==="files"){if(!base||!head){if(info===undefined)return waitBox(w,"Looking at both ideas…");w.appendChild(h("div","f-empty h-blk","The ideas this pull request named are no longer both here, so its files cannot be shown."));return;}
    var nt=h("p","h-note2 h-blk");nt.textContent="What "+p.from+" changed since it parted from "+p.to+" (at version "+base.slice(0,7)+"). Press a file to see it line by line.";w.appendChild(nt);
    X().diffList(r,{from:base,to:head},w,null);return;}
  var tl=h("div","h-tl h-blk");tl.id="hPrTl";var first=cmtCard(r,rec,{by:p.by,at:p.created,body:p.body},"","opened it");
  first.head.appendChild(rightOf(btn("quiet sm","Edit",function(){askText("What #"+p.n+" says",null,p.body,function(val){p.body=val;return keep(rec).then(function(){repaint(true);});},r,rec);})));tl.appendChild(first.el);
  var evs=[];p.comments.forEach(function(c){evs.push({at:c.at,c:c});});p.events.forEach(function(e){evs.push({at:e.at,e:e});});
  evs.sort(function(a,b){return a.at-b.at;}).forEach(function(x){if(x.c){var k=x.c.kind;tl.appendChild(cmtCard(r,rec,x.c,k==="approve"?"approve":k==="changes"?"changes":"",k==="approve"?"approved these changes":k==="changes"?"asked for changes":"wrote").el);return;}
    var e=x.e;if(e.kind==="merged"){var ln=evLine("acc",e.outside?"Merged: its versions came into "+esc(p.to)+" outside this pull request, as ":"Merged into "+esc(p.to)+" as ",e.at);ln.insertBefore(versionBtn(r,e.commit,String(e.commit||"").slice(0,7),""),ln.querySelector("small"));tl.appendChild(ln);return;}
    if(e.kind==="closed"){tl.appendChild(evLine("bad","Closed",e.at));return;}if(e.kind==="reopened"){tl.appendChild(evLine("ok","Reopened",e.at));return;}
    if(e.kind==="conflicts"){tl.appendChild(evLine("bad","The merge found both versions in "+esc(plural(e.files.length,"file"))+": "+esc(e.files.join(", ")),e.at));return;}
    if(e.kind==="stopped"){tl.appendChild(evLine("","The merge was stopped",e.at));return;}
    if(e.kind==="deleted"){tl.appendChild(evLine("","The idea “"+esc(p.from)+"” was deleted",e.at));return;}if(e.kind==="restored"){tl.appendChild(evLine("ok","The idea “"+esc(p.from)+"” was brought back",e.at));return;}
    if(e.kind==="title"){tl.appendChild(evLine("","The title was “"+esc(e.from)+"”",e.at));}});
  w.appendChild(tl);
  w.appendChild(mergeBox(r,rec,p,info));
  if(p.state!=="merged"||true){var c=composer({id:"hPrC",label:"A comment or a review",r:r,rec:rec,mdo:mdOpts(r,rec,{breaks:true}),rows:4,value:v.dC||"",oninput:function(x){v.dC=x;},onSubmit:function(){cm.click();}});c.el.classList.add("h-blk");w.appendChild(c.el);
    var row=h("div","f-row");c.el.appendChild(row);
    function add(kind){var t=c.get().trim();if(kind==="comment"&&!t){c.focus();toast("A few words first.");return;}p.comments.push({at:Date.now(),by:who(),body:t,kind:kind});p.updated=Date.now();v.dC="";
      keep(rec).then(function(){toast(kind==="approve"?"Approved.":kind==="changes"?"Changes asked for.":"Comment kept.");repaint(true);});}
    if(p.state==="open"){var ap=btn("","Approve",function(){add("approve");});ap.id="hPrApprove";row.appendChild(ap);var ch=btn("","Ask for changes",function(){if(!c.get().trim()){c.focus();toast("Say what to change first.");return;}add("changes");});ch.id="hPrChanges";row.appendChild(ch);}
    var cm=btn("pri","Comment",function(){add("comment");});cm.id="hPrComment";row.appendChild(cm);}
  if(p.state==="open"){var cl=btn("quiet","Close the pull request",function(){p.state="closed";p.closedAt=Date.now();p.events.push({at:Date.now(),kind:"closed"});syncBoard(rec);keep(rec).then(function(){toast("Pull request #"+p.n+" is closed. Its idea stays in Ideas.");repaint(true);});});cl.id="hPrClose";cl.style.color="var(--f-del)";f.appendChild(cl);}
  if(p.state==="closed"){var ro=btn("","Reopen",function(){if(r.branches.indexOf(p.from)<0){toast("The idea “"+p.from+"” is no longer here.");return;}p.state="open";p.closedAt=null;p.events.push({at:Date.now(),kind:"reopened"});keep(rec).then(function(){repaint(true);});});ro.id="hPrReopen";f.appendChild(ro);}}
function mergeBox(r,rec,p,info){var box=h("div","h-box h-blk");box.id="hPrMergeBox";
  if(p.state==="merged"){box.className="h-box acc h-blk";box.innerHTML='<b class="h-big">Merged</b>'+esc(p.from)+" came into "+esc(p.to)+(p.merged&&p.merged.commit?" as version "+esc(String(p.merged.commit).slice(0,7)):"")+", "+esc(when(p.merged&&p.merged.at))+".";
    var row=h("div","f-row");if(r.branches.indexOf(p.from)>=0&&p.from!==p.to){var del=btn("","Delete the idea “"+p.from+"”",function(){if(!r.detached&&r.branch===p.from){toast("You are working on “"+p.from+"”: switch to "+p.to+" in Ideas first.");return;}
        del.disabled=true;IngRepo.delBranch(r.id,p.from).then(function(){p.events.push({at:Date.now(),kind:"deleted"});p.branchDeleted=true;return keep(rec);}).then(function(){toast("The idea “"+p.from+"” is deleted. Its versions stay in "+p.to+".");return again();}).catch(function(e){del.disabled=false;fail(e);});});del.id="hPrDelBr";row.appendChild(del);}
    else if(p.merged&&p.merged.head&&r.branches.indexOf(p.from)<0){var rs=btn("","Bring the idea back",function(){IngRepo.branch(r.id,p.from,p.merged.head).then(function(){p.events.push({at:Date.now(),kind:"restored"});p.branchDeleted=false;return keep(rec);}).then(function(){toast("“"+p.from+"” is back in Ideas.");return again();}).catch(fail);});rs.id="hPrRestore";row.appendChild(rs);}
    if(row.childNodes.length)box.appendChild(row);return box;}
  if(p.state==="closed"){box.innerHTML='<b class="h-big">Closed</b>Closed '+esc(when(p.closedAt))+" without being merged. Reopen it to merge it.";return box;}
  if(r.branches.indexOf(p.from)<0||r.branches.indexOf(p.to)<0){box.className="h-box warn h-blk";box.innerHTML='<b class="h-big">An idea is missing</b>“'+esc(r.branches.indexOf(p.from)<0?p.from:p.to)+"” is no longer here, so this pull request can only be closed.";return box;}
  if(p.pending&&r.merging){box.className="h-box warn h-blk";box.innerHTML='<b class="h-big">Both versions are in '+esc(plural(p.pending.files.length,"file"))+"</b>"+esc(p.pending.files.join(", "))+" changed in both ideas at the same lines. Under Changes, each of those files holds both versions, between the lines marked <<<<<<< and >>>>>>>. Keep one of each (or a mix of the two), then keep the version: that completes the merge, and this pull request is marked merged.";
    var r2=h("div","f-row");r2.appendChild(btn("pri","Open Changes",function(){show("changes");}));r2.appendChild(btn("","Stop the merge",function(){IngRepo.stopMerge(r.id).then(function(){p.pending=null;p.events.push({at:Date.now(),kind:"stopped"});return keep(rec);}).then(function(){toast("The merge is stopped; your files are as they were.");return again();}).catch(fail);}));box.appendChild(r2);return box;}
  if(r.merging){box.className="h-box warn h-blk";box.innerHTML='<b class="h-big">Another merge is under way</b>Finish it under Changes, or stop it, before merging this one.';return box;}
  if(info===undefined||info===null){box.textContent="Looking at both ideas…";return box;}
  if(isErr(info)){box.textContent=cap(info.__err);return box;}
  box.innerHTML='<b class="h-big">'+(info.ahead.length?plural(info.ahead.length,"version")+" to bring in":"Nothing left to bring in")+"</b>"+(info.ahead.length?(info.both.length?esc(plural(info.both.length,"file"))+" changed in both ideas since they parted ("+esc(info.both.slice(0,4).join(", "))+(info.both.length>4?" and more":"")+"). Fabrica joins them line by line; where two changes touch the same lines it keeps both for you to choose.":"Nothing in "+esc(p.to)+" crossed these changes: they come in cleanly."):esc(p.to)+" has every version of "+esc(p.from)+".");
  var row=h("div","f-row"),mg=btn("pri","Merge into "+p.to,function(){mergePR(r,rec,p,info,mg);});mg.id="hPrMerge";mg.disabled=!info.ahead.length;row.appendChild(mg);box.appendChild(row);return box;}
/* the merge: the working copy moves to the target idea, and the other is brought in by Fabrica's three-way merge */
function mergePR(r,rec,p,info,k){k.disabled=true;var key=r.id+"|"+p.n;INFLIGHT[key]=1;
  IngRepo.status(r.id).then(function(st){if(!st.clean)throw new Error("keep or put back the changes under Changes first: a merge starts from files with nothing waiting");if(st.merging)throw new Error("a merge is already under way: finish it under Changes, or stop it");
    return (!r.detached&&r.branch===p.to)?null:IngRepo.switchTo(r.id,p.to);}).then(function(){return IngRepo.resolve(r.id,"refs/heads/"+p.from);}).then(function(theirs){
    return IngRepo.merge(r.id,p.from,{msg:"Merge pull request #"+p.n+" from "+p.from+"\n\n"+p.title}).then(function(m){
      if(m.kind==="conflicts"){p.pending={theirs:theirs,base:info.base,at:Date.now(),files:m.conflicts||[]};p.events.push({at:Date.now(),kind:"conflicts",files:m.conflicts||[]});
        return keep(rec).then(function(){toast("Both versions are in "+plural((m.conflicts||[]).length,"file")+": keep one of each under Changes, then keep the version.");});}
      return IngRepo.resolve(r.id,"refs/heads/"+p.to).then(function(now){markMerged(rec,p,{commit:m.commit||now,head:theirs,base:info.base});syncBoard(rec);return keep(rec);}).then(function(){toast("Merged into "+p.to+". You are working on "+p.to+" now.");});});})
  .then(function(){delete INFLIGHT[key];return again();},function(e){delete INFLIGHT[key];k.disabled=false;fail(e);again();});}

/* ======================= COMPARE: any two versions, ideas or releases (the version comparison tool) ======================= */
function cmpData(r,a,b){return Promise.all([a==="empty"?Promise.resolve("empty"):IngRepo.resolve(r.id,a),IngRepo.resolve(r.id,b)]).then(function(x){if(!x[1])throw new Error("nothing is kept at "+refLabel(b)+" yet");if(!x[0])throw new Error("nothing is kept at "+refLabel(a)+" yet");
  return Promise.all([between(r,x[0],x[1]),x[0]===x[1]?Promise.resolve([]):IngRepo.diff(r.id,{from:x[0],to:x[1],context:3,limit:(window.ingFabMB?2*window.ingFabMB.compare:8)*1048576})]).then(function(y){return {ao:x[0],bo:x[1],bt:y[0],diff:y[1]};});});}
function kindWord(k){return k==="removed"?"taken away":k==="mode"?"mode":k;}
function hunksInto(pre,c){if(c.binary||!c.hunks.length){pre.appendChild(h("div","f-dl hunk",c.binary?"A binary file: kept whole, with no lines to show ("+kb(c.oldSize)+" → "+kb(c.newSize)+").":c.kind==="moved"?"Moved, with no line changed.":c.kind==="mode"?"Only its mode changed.":(c.oldSize+c.newSize)>(window.ingFabMB?2*window.ingFabMB.compare:8)*1048576?"Too large to show line by line here ("+kb(c.newSize)+").":"No lines differ."));return;}
  c.hunks.forEach(function(hk){pre.appendChild(h("div","f-dl hunk","lines "+(hk.b0+1).toLocaleString("en-GB")+" to "+(hk.b0+hk.bN).toLocaleString("en-GB")+(hk.a0!==hk.b0?" (were "+(hk.a0+1).toLocaleString("en-GB")+" to "+(hk.a0+hk.aN).toLocaleString("en-GB")+")":"")));
    var la=hk.a0,lb=hk.b0;hk.lines.forEach(function(l){var d=document.createElement("div");d.className="f-dl"+(l[0]==="+"?" add":l[0]==="-"?" del":"");var num=l[0]==="-"?(++la):(++lb);if(l[0]===" ")la++;
      var ii=document.createElement("i");ii.textContent=num.toLocaleString("en-GB");var s=document.createElement("s");s.textContent=l[0]===" "?"":l[0]==="+"?"+":"−";d.appendChild(ii);d.appendChild(s);d.appendChild(document.createTextNode(l[1]));pre.appendChild(d);});});}
function diffBlock(c,i,v,auto){var d=h("section","h-dblk h-blk");d.id="hD"+i;d.setAttribute("data-path",c.path);d.setAttribute("aria-label",c.path+", "+kindWord(c.kind));
  var hd=h("div","f-diff-h");hd.innerHTML="<b>"+esc(c.path)+"</b>"+(c.from?"<small>from "+esc(c.from)+"</small>":"")+'<span class="k '+esc(c.kind)+'">'+esc(kindWord(c.kind))+"</span>"+(c.binary?"<span>"+kb(c.oldSize)+" → "+kb(c.newSize)+"</span>":'<span class="a">+'+c.adds+'</span><span class="r">−'+c.dels+"</span>");
  var shut=v.shut[c.path]!=null?v.shut[c.path]:auto,rt=h("span","h-right"),tb=btn("quiet sm",shut?"Show":"Hide",function(){v.shut[c.path]=!shut;repaint();});tb.setAttribute("aria-expanded",shut?"false":"true");tb.setAttribute("aria-label",(shut?"Show ":"Hide ")+c.path);rt.appendChild(tb);hd.appendChild(rt);d.appendChild(hd);
  if(!shut){var pre=h("pre","f-dcode");hunksInto(pre,c);d.appendChild(pre);}return d;}
function paintCompare(r,w,f){var v=V(r).cmp,rec=recOf(r);
  if(!r.head){w.appendChild(h("div","f-empty h-blk","<b>Nothing to compare yet</b>Keep two versions, and any two of them can be set side by side here, line by line."));return;}
  if(!v.b)v.b=r.detached?r.head:"refs/heads/"+(r.branch||defBranch(r,rec));
  if(!v.a){var dm="refs/heads/"+defBranch(r,rec);if(r.branches.length>1&&v.b!==dm)v.a=dm;else{var h2=want(gk(r,"head2"),function(){return IngRepo.log(r.id,{max:1});});if(h2===undefined)return waitBox(w,"Reading the versions…");v.a=h2&&!isErr(h2)&&h2[0]&&h2[0].parents[0]||"empty";}}
  sig(r,"compare|"+v.a+"|"+v.b);
  var intro=h("p","h-note2 h-blk");intro.textContent="Set any two versions side by side: ideas, releases or single versions. Everything that changed from the first to the second is shown, file by file and line by line.";w.appendChild(intro);
  var pk=h("div","h-pick h-blk"),la=h("label"),lb=h("label");la.appendChild(T("span",null,"From"));lb.appendChild(T("span",null,"To"));
  var sa=picker(refOptions(r,true),v.a,"From: the first version",function(x){v.a=x;v.focus=null;repaint(true);}),sb=picker(refOptions(r,false),v.b,"To: the second version",function(x){v.b=x;v.focus=null;repaint(true);});sa.id="hCmpA";sb.id="hCmpB";
  la.appendChild(sa);lb.appendChild(sb);var sw=btn("sm","⇄ Swap",function(){if(v.a==="empty"){toast("“The start” can only be the first side.");return;}var t=v.a;v.a=v.b;v.b=t;repaint(true);});sw.id="hCmpSwap";sw.setAttribute("aria-label","Swap the two sides");sw.style.marginBottom="1px";
  pk.appendChild(la);pk.appendChild(sw);pk.appendChild(lb);w.appendChild(pk);
  if(isBranchRef(v.a)&&isBranchRef(v.b)&&v.a!==v.b){var op=btn("","Open a pull request",function(){var pv=V(r).pr;pv.form={from:refLabel(v.b),to:refLabel(v.a),title:"",body:""};pv.open="new";show("pulls");});op.id="hCmpPr";f.appendChild(op);}
  if(v.a===v.b){w.appendChild(h("div","f-empty h-blk","<b>The same on both sides</b>Choose two different versions."));return;}
  var key=gk(r,"cmp|"+v.a+"|"+v.b),d=want(key,function(){return cmpData(r,v.a,v.b);});
  if(d===undefined)return waitBox(w,"Setting "+refLabel(v.a)+" and "+refLabel(v.b)+" side by side…");if(isErr(d))return errBox(w,d.__err,key);
  var adds=0,dels=0;d.diff.forEach(function(c){adds+=c.adds;dels+=c.dels;});
  var sm=h("div","h-sum h-blk");sm.id="hCmpSum";
  [plural(d.bt.ahead.length,"version")+" from "+refLabel(v.a)+" to "+refLabel(v.b),plural(d.diff.length,"file")+" changed"].forEach(function(t){sm.appendChild(T("span","f-chip",t));});
  sm.appendChild(h("span","f-chip",'<span style="color:var(--f-add)">+'+adds.toLocaleString("en-GB")+'</span> <span style="color:var(--f-del)">−'+dels.toLocaleString("en-GB")+"</span>"));
  if(d.bt.behind.length&&v.a!=="empty")sm.appendChild(T("span","f-chip warn",refLabel(v.b)+" does not have "+plural(d.bt.behind.length,"version")+" of "+refLabel(v.a)));w.appendChild(sm);
  if(d.ao===d.bo){w.appendChild(h("div","f-empty h-blk","<b>These are the same version</b>Nothing differs."));return;}
  if(d.bt.ahead.length){w.appendChild(T("h3","h-sub h-blk","The versions between them"));var vb=h("div","h-vers h-blk");vb.id="hCmpVers";
    d.bt.ahead.slice(0,60).forEach(function(c){var b=h("button","h-ver");b.type="button";b.innerHTML='<span class="t">'+esc(c.title)+'</span><span class="h-id">'+esc(c.short)+"</span><small>"+esc(when(c.when))+"</small>";b.title="Compare this version with the one before it";
      b.onclick=function(){v.a=c.parents[0]||"empty";v.b=c.oid;v.focus=null;repaint(true);};vb.appendChild(b);});
    if(d.bt.ahead.length>60)vb.appendChild(T("p","f-hint","and "+plural(d.bt.ahead.length-60,"older version")+"."));w.appendChild(vb);}
  if(!d.diff.length){w.appendChild(h("div","f-empty h-blk","<b>No file differs</b>The versions between them changed nothing that is still different."));return;}
  w.appendChild(T("h3","h-sub h-blk","Every file changed"));var idx=h("div","f-files h-blk");idx.id="hCmpIdx";
  d.diff.forEach(function(c,i){var row=h("button","f-frow");row.type="button";row.innerHTML='<span class="p">'+esc(c.path)+'</span><span class="k '+esc(c.kind)+'">'+esc(kindWord(c.kind))+"</span>"+(c.binary?'<span class="c" style="color:var(--f-ink3)">'+kb(c.newSize)+"</span>":'<span class="c"><span class="a">+'+c.adds+'</span> <span class="r">−'+c.dels+"</span></span>");
    row.onclick=function(){var el=$("hD"+i);if(el)el.scrollIntoView({block:"start",behavior:"smooth"});};idx.appendChild(row);});w.appendChild(idx);
  w.appendChild(h("div","h-blk")).style.height="10px";var shown=0;
  d.diff.forEach(function(c,i){var n=c.hunks.reduce(function(a,hk){return a+hk.lines.length;},0),auto=shown>6000||n>2500;if(!auto&&v.shut[c.path]!==true)shown+=n;w.appendChild(diffBlock(c,i,v,auto));});
  if(v.focus){var fi=-1;d.diff.forEach(function(c,i){if(c.path===v.focus)fi=i;});if(fi>=0)setTimeout(function(){var el=$("hD"+fi);if(el)el.scrollIntoView({block:"start"});},40);v.focus=null;}}

/* ======================= ACTIONS: Fabrica's own checks, as runs ======================= */
var CKN=[["reads","The page reads cleanly"],["names","Every file it names is here"],["opens","It opens with no errors"],["self","Its own self-test"],["number","Its build number moves forward"]];
function ckRows(checks,live){var box=h("div","f-checks");CKN.forEach(function(k,i){var got=(checks||[]).filter(function(x){return x.id===k[0];})[0],st="",mark="○",det="";
    if(got){st=got.state==="ok"?"ok":got.state==="none"||got.state==="skip"?"":got.state==="warn"?"warn":"fail";mark=st==="ok"?"✓":st==="fail"?"!":st==="warn"?"~":"○";det=got.detail||"";}
    else if(live&&(checks||[]).length===i){st="run";mark="…";det="running";}
    var e=h("div","f-ck"+(st?" "+st:""));e.setAttribute("data-ck",k[0]);e.innerHTML='<span class="m">'+mark+"</span><div>"+esc(k[1])+"<small>"+esc(det)+"</small></div>";box.appendChild(e);});return box;}
function runWord(x){return !x.page?"No page found":x.ok?"Passed":"Found something";}
function paintActions(r,w,f){var rec=needRec(r,w,"the runs");if(!rec)return;var v=V(r).act;sig(r,"actions");
  if(typeof IngShip==="undefined"||!IngShip.test){w.appendChild(h("div","f-empty h-blk","<b>No checks in this copy</b>Fabrica's checks are not part of this copy."));return;}
  var intro=h("div","h-box h-blk");intro.innerHTML='<b class="h-big">Fabrica\'s own checks, as runs</b>On each version you choose, Fabrica runs its five checks: the page reads cleanly, every file it names is here, it opens with no errors, its own self-test, and its build number moves forward. Each run is kept here with what it found.';w.appendChild(intro);
  if(!r.head){w.appendChild(h("div","f-empty h-blk","Keep a first version, then run the checks on it."));return;}
  var bar=h("div","h-bar h-blk"),ref=v.ref||(r.detached?r.head:"refs/heads/"+(r.branch||defBranch(r,rec)));
  bar.appendChild(picker(refOptions(r),ref,"The version to check",function(x){v.ref=x;}));
  var go=btn("pri","Run the checks",function(){var sel=bar.querySelector("select");v.ref=sel.value;go.disabled=true;runChecks(r,v.ref,"hand").then(function(run){v.open=run.n;toast("Run #"+run.n+": "+runWord(run).toLowerCase()+".");},fail);});go.id="hActRun";if(LIVE[r.id])go.disabled=true;bar.appendChild(go);
  var sw=h("label","f-sw h-right");sw.innerHTML='<input type="checkbox" id="hActAuto"'+(rec.auto?" checked":"")+'>Run them on every version kept';sw.querySelector("input").onchange=function(){rec.auto=this.checked;keep(rec).then(function(){toast(rec.auto?"The checks will run on every version you keep.":"The checks run only when you ask now.");});};bar.appendChild(sw);w.appendChild(bar);
  var list=h("div","h-blk");list.id="hRuns";list.style.paddingTop="10px";w.appendChild(list);
  if(LIVE[r.id]){var L=LIVE[r.id],lv=h("div","h-run");lv.setAttribute("aria-expanded","true");lv.innerHTML='<button type="button"><span class="h-dot run">…</span><span class="t"><b>Running the checks on '+esc(refLabel(L.ref))+"</b><small>"+(L.by==="kept"?"on the version just kept":"by hand")+"</small></span></button>";
    var bd=h("div","h-body");bd.appendChild(ckRows(L.checks,true));lv.appendChild(bd);list.appendChild(lv);}
  if(!rec.runs.length&&!LIVE[r.id]){list.appendChild(h("div","f-empty","<b>No runs yet</b>Choose a version above and run the checks, or let them run on every version you keep."));return;}
  rec.runs.forEach(function(x,i){var open=v.open===x.n,e=h("div","h-run");e.setAttribute("aria-expanded",open?"true":"false");e.setAttribute("data-n",x.n);e.style.animationDelay=Math.min(i,10)*0.03+"s";
    var hb=document.createElement("button");hb.type="button";hb.setAttribute("aria-expanded",open?"true":"false");
    hb.innerHTML='<span class="h-dot '+(!x.page?"none":x.ok?"ok":"bad")+'">'+(!x.page?"○":x.ok?"✓":"!")+'</span><span class="t"><b>#'+x.n+" · "+esc(runWord(x))+" · "+esc(x.title||x.short)+"</b><small>"+esc([x.by==="kept"?"when it was kept":"by hand",x.ref!==x.short?x.ref:"",x.short,when(x.at),(x.took/1000).toFixed(1)+" s"].filter(Boolean).join(" · "))+"</small></span>";
    hb.onclick=function(){v.open=open?null:x.n;repaint();};e.appendChild(hb);
    if(open){var bd2=h("div","h-body");bd2.appendChild(ckRows(x.checks,false));var row=h("div","f-row");row.style.marginTop="10px";
      row.appendChild(btn("sm","Run it again",function(){runChecks(r,x.oid,"hand").then(function(run){v.open=run.n;},fail);}));
      row.appendChild(btn("sm","Look at this version",function(){var c=V(r).code;c.ref=x.oid;c.file=null;c.dir="";c.res=false;show("code");}));bd2.appendChild(row);e.appendChild(bd2);}
    list.appendChild(e);});}

/* ======================= PROJECTS: a board of To do, In progress and Done ======================= */
var COLS=[["todo","To do"],["doing","In progress"],["done","Done"]];
function cardInfo(rec,k){var p=k.split(":"),n=+p[1];if(p[0]==="note"){var nt=rec.board.notes[p[1]];return {kind:"note",text:nt?nt.text:"",it:null};}
  var it=p[0]==="issue"?issueN(rec,n):pullN(rec,n);return {kind:p[0],it:it};}
function moveCard(r,rec,k,to,idx,focus){COLS.forEach(function(c){var a=rec.board[c[0]],i=a.indexOf(k);if(i>=0)a.splice(i,1);});var arr=rec.board[to];idx=Math.max(0,Math.min(idx==null?arr.length:idx,arr.length));arr.splice(idx,0,k);
  if(focus)V(r).board.focus=k;keep(rec).then(function(){say("Moved to "+COLS.filter(function(c){return c[0]===to;})[0][1]+".");repaint(true);});}
function paintProjects(r,w,f){var rec=needRec(r,w,"the board");if(!rec)return;sig(r,"projects");var vb=V(r).board;
  var before=JSON.stringify(rec.board);syncBoard(rec);if(JSON.stringify(rec.board)!==before)keep(rec);
  var nt=h("p","h-note2 h-blk");nt.textContent="Drag a card to move it, or choose it and press ← or →; Alt with ↑ or ↓ moves it up or down. A closed issue, and a pull request merged or closed, moves to Done by itself.";w.appendChild(nt);
  var bd=h("div","h-board h-blk");bd.id="hBoard";
  COLS.forEach(function(cl,ci){var col=h("section","h-colm");col.setAttribute("data-col",cl[0]);col.setAttribute("aria-label",cl[1]);var hh=h("h4");hh.appendChild(document.createTextNode(cl[1]));hh.appendChild(T("span","f-chip",String(rec.board[cl[0]].length)));col.appendChild(hh);
    var cards=h("div","h-cards");cards.setAttribute("role","list");cards.setAttribute("aria-label",cl[1]);
    rec.board[cl[0]].forEach(function(k,ki){cards.appendChild(cardEl(r,rec,k,cl[0],ki));});
    if(!rec.board[cl[0]].length)cards.appendChild(T("p","h-empty-n",ci===0?"Nothing to do yet.":ci===1?"Nothing in progress.":"Nothing done yet."));
    col.appendChild(cards);
    if(ci===0){var an=btn("sm h-add","＋ Note",function(){askText("A note for the board","Anything: a reminder, a step, a thought.","",function(t){t=t.trim();if(!t)throw new Error("a few words first");var id="n"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);rec.board.notes[id]={text:t,at:Date.now()};rec.board.todo.push("note:"+id);return keep(rec).then(function(){repaint(true);});},r,rec);});an.id="hBoardNote";col.appendChild(an);}
    bd.appendChild(col);});
  w.appendChild(bd);
  var add=btn("","Add issues and pull requests",function(){var free=rec.issues.map(function(x){return "issue:"+x.n;}).concat(rec.pulls.map(function(x){return "pr:"+x.n;})).filter(function(k){return !onBoard(rec,k);});
    var sh=X().sheet("Add to the board",free.length?"Choose what to add. Each one goes to To do, or to Done when it is closed.":"Every issue and pull request is on the board already.");var picked=[];
    free.forEach(function(k){var ci=cardInfo(rec,k),it=ci.it,o=h("button","f-opt");o.type="button";o.setAttribute("aria-pressed","false");o.setAttribute("data-k",k);o.innerHTML='<span class="ic">'+icOf(it)+"</span><span><b>"+esc(it.title)+"</b><small>"+(k.indexOf("pr:")===0?"Pull request":"Issue")+" #"+it.n+" · "+esc(it.state)+"</small></span>";
      o.onclick=function(){var i=picked.indexOf(k);if(i>=0)picked.splice(i,1);else picked.push(k);o.setAttribute("aria-pressed",i>=0?"false":"true");go.textContent="Add "+picked.length;go.disabled=!picked.length;};sh.box.appendChild(o);});
    var end=h("div","end"),go=btn("pri","Add 0",function(){picked.forEach(function(k){var it=cardInfo(rec,k).it;(it&&it.state!=="open"?rec.board.done:rec.board.todo).push(k);});keep(rec).then(function(){sh.close();toast(plural(picked.length,"card")+" added.");repaint(true);});});go.disabled=true;go.id="hBoardAddGo";
    end.appendChild(btn("","Close",sh.close));if(free.length)end.appendChild(go);sh.box.appendChild(end);});add.id="hBoardAdd";f.appendChild(add);
  if(vb.focus){var fk=vb.focus;vb.focus=null;setTimeout(function(){var el=bd.querySelector('.h-card[data-k="'+fk+'"]');if(el)el.focus();},20);}}
function cardEl(r,rec,k,col,ki){var ci=cardInfo(rec,k),c=h("div","h-card");c.tabIndex=0;c.setAttribute("role","listitem");c.setAttribute("data-k",k);
  var grip=h("span","h-grip","⋮⋮");grip.setAttribute("aria-hidden","true");c.appendChild(grip);var body=h("div","h-cb");
  if(ci.kind==="note"){var tt=h("div","h-ct");tt.innerHTML=IC.note;tt.appendChild(T("span",null,ci.text));body.appendChild(tt);body.appendChild(T("small",null,"A note"));c.setAttribute("aria-label","Note: "+ci.text);}
  else{var it=ci.it,t2=h("div","h-ct",icOf(it));t2.appendChild(T("span",null,it.title));body.appendChild(t2);var sm=T("small",null,(ci.kind==="pr"?"Pull request #":"Issue #")+it.n+" · "+(it.state==="open"?"open":it.state));body.appendChild(sm);
    if(it.labels&&it.labels.length){var lr=h("div");it.labels.forEach(function(l){lr.appendChild(labChip(rec,l));});body.appendChild(lr);}
    c.setAttribute("aria-label",(ci.kind==="pr"?"Pull request ":"Issue ")+it.n+": "+it.title+", "+it.state);}
  c.appendChild(body);
  var x=h("button","h-x","×");x.type="button";x.setAttribute("aria-label","Take it off the board");x.onclick=function(e){e.stopPropagation();COLS.forEach(function(cl){var a=rec.board[cl[0]],i=a.indexOf(k);if(i>=0)a.splice(i,1);});
    if(ci.kind==="note")delete rec.board.notes[k.split(":")[1]];keep(rec).then(function(){say("Taken off the board.");repaint(true);});};c.appendChild(x);
  function open(){if(c._dragged)return;if(ci.kind==="note"){var id=k.split(":")[1];askText("The note",null,ci.text,function(t){t=t.trim();if(!t)throw new Error("a few words first, or take the note off the board");rec.board.notes[id].text=t;return keep(rec).then(function(){repaint(true);});},r,rec);}else openItem(r,ci.it.n);}
  c.addEventListener("click",function(e){if(e.target.closest(".h-x"))return;open();});
  c.addEventListener("keydown",function(e){if(e.target!==c)return;var ci2=COLS.map(function(z){return z[0];}).indexOf(col),arr=rec.board[col];
    if(e.key==="Enter"||e.key===" "){e.preventDefault();open();return;}
    if(e.key==="ArrowRight"&&ci2<2){e.preventDefault();moveCard(r,rec,k,COLS[ci2+1][0],null,true);return;}
    if(e.key==="ArrowLeft"&&ci2>0){e.preventDefault();moveCard(r,rec,k,COLS[ci2-1][0],null,true);return;}
    if(e.altKey&&e.key==="ArrowUp"&&ki>0){e.preventDefault();moveCard(r,rec,k,col,ki-1,true);return;}
    if(e.altKey&&e.key==="ArrowDown"&&ki<arr.length-1){e.preventDefault();moveCard(r,rec,k,col,ki+1,true);return;}
    if(!e.altKey&&(e.key==="ArrowUp"||e.key==="ArrowDown")){e.preventDefault();var sib=e.key==="ArrowUp"?c.previousElementSibling:c.nextElementSibling;if(sib&&sib.classList.contains("h-card"))sib.focus();}});
  c.addEventListener("pointerdown",function(e){if(e.button!==0||e.target.closest(".h-x"))return;if(e.pointerType==="touch"&&!e.target.closest(".h-grip"))return;
    var x0=e.clientX,y0=e.clientY,ghost=null,over=null,ox=0,oy=0,started=false;
    function mv(ev){if(!started){if(Math.abs(ev.clientX-x0)+Math.abs(ev.clientY-y0)<6)return;started=true;var rc=c.getBoundingClientRect();ox=x0-rc.left;oy=y0-rc.top;ghost=c.cloneNode(true);ghost.classList.add("h-ghost");ghost.removeAttribute("tabindex");ghost.style.width=rc.width+"px";$("fb").appendChild(ghost);c.classList.add("h-lift");}
      ev.preventDefault();ghost.style.left=(ev.clientX-ox)+"px";ghost.style.top=(ev.clientY-oy)+"px";var el=document.elementFromPoint(ev.clientX,ev.clientY),cl=el&&el.closest?el.closest(".h-colm"):null;
      if(over&&over!==cl)over.classList.remove("h-over");if(cl)cl.classList.add("h-over");over=cl;}
    function up(ev){document.removeEventListener("pointermove",mv,true);document.removeEventListener("pointerup",up,true);document.removeEventListener("pointercancel",up,true);if(!started)return;
      if(ghost)ghost.remove();c.classList.remove("h-lift");if(over)over.classList.remove("h-over");c._dragged=true;setTimeout(function(){c._dragged=false;},50);
      if(over&&ev.type==="pointerup"){var to=over.getAttribute("data-col"),others=[].slice.call(over.querySelectorAll(".h-card")).filter(function(z){return z!==c;}),idx=others.length;
        for(var i=0;i<others.length;i++){var rc=others[i].getBoundingClientRect();if(ev.clientY<rc.top+rc.height/2){idx=i;break;}}moveCard(r,rec,k,to,idx,false);}}
    document.addEventListener("pointermove",mv,true);document.addEventListener("pointerup",up,true);document.addEventListener("pointercancel",up,true);});
  return c;}

/* ======================= WIKI: pages in Markdown, linked with [[Page]], each with its history ======================= */
function wikiName(s){return String(s||"").replace(/[\[\]|#\n\r\/\\]+/g," ").replace(/\s+/g," ").trim().slice(0,80);}
function wikiFind(rec,name){if(!name)return null;if(rec.wiki.pages[name])return name;var l=String(name).toLowerCase(),ks=Object.keys(rec.wiki.pages);for(var i=0;i<ks.length;i++)if(ks[i].toLowerCase()===l)return ks[i];return null;}
function wikiText(rec,name){var p=rec.wiki.pages[name];return p&&p.revs.length?p.revs[p.revs.length-1].text:"";}
function wikiOrder(rec){return Object.keys(rec.wiki.pages).sort(function(a,b){return a==="Home"?-1:b==="Home"?1:a.localeCompare(b);});}
function wikiMd(r,rec){return mdOpts(r,rec,{wiki:function(page,text){var nm=wikiName(page),have=wikiFind(rec,nm);return '<a href="#" data-wiki="'+esc(have||nm)+'"'+(have?"":' class="h-new" title="Not written yet: press to write it"')+">"+esc(text)+"</a>";}});}
function wikiSave(rec,name,text,msg){var p=rec.wiki.pages[name]||(rec.wiki.pages[name]={revs:[],created:Date.now()});p.revs.push({at:Date.now(),msg:msg,text:text,by:who()});if(p.revs.length>300)p.revs.splice(0,p.revs.length-300);return keep(rec);}
function paintWiki(r,w,f){var rec=needRec(r,w,"the wiki");if(!rec)return;var v=V(r).wiki,pages=wikiOrder(rec);
  if(!pages.length&&v.mode!=="edit"&&v.mode!=="new"){sig(r,"wiki-empty");w.appendChild(h("div","f-empty h-blk","<b>No wiki yet</b>A wiki holds the longer words about an app: how it works, what is planned, notes for later. Its pages link to each other with [[Page name]]. It starts with its Home page."));
    var k=btn("pri","Write the Home page",function(){v.page="Home";v.mode="edit";repaint(true);});k.id="hWikiStart";f.appendChild(k);return;}
  if(v.mode==="view"&&!wikiFind(rec,v.page))v.page=pages[0];
  var pc=h("nav","h-pages h-blk");pc.setAttribute("aria-label","The wiki's pages");
  pages.forEach(function(nm){var b=T("button",null,nm);b.type="button";b.setAttribute("aria-pressed",nm===wikiFind(rec,v.page)&&v.mode!=="new"?"true":"false");b.onclick=function(){v.page=nm;v.mode="view";v.rev=null;repaint(true);};pc.appendChild(b);});
  var nb=T("button",null,"＋ New page");nb.type="button";nb.id="hWikiNew";nb.onclick=function(){v.mode="new";v.rev=null;repaint(true);};pc.appendChild(nb);w.appendChild(pc);
  if(v.mode==="edit"||v.mode==="new")return wikiEdit(r,rec,v,w,f);
  if(v.mode==="hist")return wikiHist(r,rec,v,w,f);
  var name=wikiFind(rec,v.page),pg=rec.wiki.pages[name],last=pg.revs[pg.revs.length-1];sig(r,"wiki|"+name);
  var box=h("article","h-wiki h-blk");box.appendChild(T("h2",null,name));var mv=h("div","h-md");mv.id="hWikiView";box.appendChild(mv);
  mdInto(mv,last.text.trim()?md(last.text,wikiMd(r,rec)):"<p class='h-empty-n'>This page is empty.</p>",r,rec);
  var ft=T("p","f-hint",plural(pg.revs.length,"revision")+" · last changed "+when(last.at)+(last.msg?": "+last.msg:""));ft.style.marginTop="14px";box.appendChild(ft);w.appendChild(box);
  var e1=btn("pri","Edit",function(){v.mode="edit";repaint(true);});e1.id="hWikiEdit";f.appendChild(e1);
  var e2=btn("","History",function(){v.mode="hist";v.rev=null;repaint(true);});e2.id="hWikiHist";f.appendChild(e2);
  if(name!=="Home"||pages.length===1){var e3=btn("quiet","Delete this page",function(){ask("Delete the page “"+name+"”?","The page and all its revisions go. Links to it then offer to write it again.","Delete it",true).then(function(y){if(!y)return;delete rec.wiki.pages[name];keep(rec).then(function(){v.page="Home";v.mode="view";toast("“"+name+"” is deleted.");repaint(true);});});});e3.style.color="var(--f-del)";f.appendChild(e3);}}
function wikiEdit(r,rec,v,w,f){var isNew=v.mode==="new",name=isNew?"":(wikiFind(rec,v.page)||wikiName(v.page)||"Home"),exists=!isNew&&!!rec.wiki.pages[name];sig(r,"wiki-edit|"+(isNew?"":name));
  var form=h("div","h-form h-blk");form.appendChild(T("h3","h-sub",isNew?"A new page":exists?"Editing “"+name+"”":"Writing “"+name+"”")).style.margin="0";
  var ni=null;if(isNew){var nl=h("label");nl.appendChild(T("span",null,"Its name"));ni=h("input");ni.type="text";ni.id="hWikiName";ni.placeholder="How it works, Plans, Notes…";nl.appendChild(ni);form.appendChild(nl);}
  var c=composer({id:"hWikiText",label:"The page",value:isNew?"":wikiText(rec,name),r:r,rec:rec,mdo:wikiMd(r,rec),rows:14,ph:"Write the page. Markdown works, and [[Another page]] links to another page of the wiki."});c.el.style.padding="0";form.appendChild(c.el);
  var ml=h("label");ml.appendChild(T("span",null,"What changed, in a few words (kept in the page's history)"));var mi=h("input");mi.type="text";mi.id="hWikiMsg";mi.placeholder=exists?"What changed?":"First version";ml.appendChild(mi);form.appendChild(ml);w.appendChild(form);
  setTimeout(function(){(ni||c.ta).focus();},60);
  f.appendChild(btn("","Cancel",function(){v.mode=wikiOrder(rec).length?"view":"view";repaint(true);}));
  var sv=btn("pri","Save the page",function(){var nm=isNew?wikiName(ni.value):name;if(!nm){if(ni)ni.focus();toast("A name for the page first.");return;}
    if(isNew&&wikiFind(rec,nm)){toast("There is a page called “"+wikiFind(rec,nm)+"” already.");return;}var text=c.get();
    if(exists&&text===wikiText(rec,name)){toast("Nothing changed.");return;}sv.disabled=true;
    wikiSave(rec,nm,text,mi.value.trim()||(exists?"Changed "+nm:"Wrote "+nm)).then(function(){v.page=nm;v.mode="view";toast("“"+nm+"” is saved.");repaint(true);},function(){sv.disabled=false;});});sv.id="hWikiSave";sv.style.marginLeft="auto";f.appendChild(sv);}
function wikiHist(r,rec,v,w,f){var name=wikiFind(rec,v.page),pg=rec.wiki.pages[name];sig(r,"wiki-hist|"+name+"|"+v.rev);
  w.appendChild(T("h3","h-sub h-blk","The history of “"+name+"”"));var n=pg.revs.length,sel=v.rev==null||v.rev>=n?n-1:v.rev,list=h("div","h-revs h-blk");list.id="hWikiRevs";
  for(var i=n-1;i>=0;i--)(function(i){var rv=pg.revs[i],pv=i>0?pg.revs[i-1].text:"",rs=IngRepo.core.lineDiff(split(pv),split(rv.text)),a=0,d=0;rs.forEach(function(x){a+=x.b1-x.b0;d+=x.a1-x.a0;});
    var b=h("button","h-ver");b.type="button";b.setAttribute("aria-pressed",i===sel?"true":"false");b.innerHTML='<span class="t">'+esc(rv.msg||"A change")+'</span><small><span style="color:var(--f-add)">+'+a+'</span> <span style="color:var(--f-del)">−'+d+"</span> · "+esc(when(rv.at))+"</small>";
    b.onclick=function(){v.rev=i;repaint();};list.appendChild(b);})(i);
  w.appendChild(list);
  var cur=pg.revs[sel],prev=sel>0?pg.revs[sel-1].text:"",a2=split(prev),b2=split(cur.text),hk=IngRepo.core.hunks(a2,b2,3),c={path:name,kind:sel?"changed":"added",hunks:hk,adds:0,dels:0,binary:false,oldSize:prev.length,newSize:cur.text.length};
  hk.forEach(function(x){x.lines.forEach(function(l){if(l[0]==="+")c.adds++;else if(l[0]==="-")c.dels++;});});
  w.appendChild(T("h3","h-sub h-blk",sel?"What this revision changed":"The first revision"));var blk=diffBlock(c,"w"+sel,{shut:{}},false);blk.id="hWikiDiff";w.appendChild(blk);
  f.appendChild(btn("","Back to the page",function(){v.mode="view";v.rev=null;repaint(true);}));
  if(sel<n-1){var bb=btn("pri","Bring this revision back",function(){wikiSave(rec,name,cur.text,"Brought back the revision of "+when(cur.at)).then(function(){v.mode="view";v.rev=null;toast("That revision is the page again; the history keeps every one.");repaint(true);});});bb.id="hWikiBack";f.appendChild(bb);}}

/* ======================= INSIGHTS ======================= */
var LANGS=[["HTML",/\.(html?|xhtml)$/i],["JavaScript",/\.(m?js|cjs|jsx)$/i],["CSS",/\.(css|scss|sass|less)$/i],["JSON",/\.(json|webmanifest|map)$/i],["Markdown",/\.(md|markdown)$/i],["Python",/\.py$/i],["Swift",/\.swift$/i],["Kotlin",/\.(kt|kts)$/i]];
function langOf(p){for(var i=0;i<LANGS.length;i++)if(LANGS[i][1].test(p))return i;return -1;}
function insData(r){return Promise.all([allVersions(r,3000),r.head?IngRepo.files(r.id,r.detached?r.head:"refs/heads/"+r.branch):Promise.resolve([])]).then(function(x){var all=x[0],files=x[1];
  var now=new Date(),d=new Date(now.getFullYear(),now.getMonth(),now.getDate());d.setDate(d.getDate()-((d.getDay()+6)%7));
  var weeks=[];for(var i=15;i>=0;i--){var s=new Date(d);s.setDate(s.getDate()-7*i);weeks.push({start:s.getTime(),n:0});}
  all.forEach(function(c){for(var k=15;k>=0;k--){var end=k<15?weeks[k+1].start:weeks[15].start+7*864e5;if(c.when>=weeks[k].start&&c.when<end){weeks[k].n++;break;}}});
  var people={};all.forEach(function(c){var nm=(c.author&&c.author.name)||"Someone";var p=people[nm]||(people[nm]={name:nm,n:0,first:c.when,last:c.when});p.n++;p.first=Math.min(p.first,c.when);p.last=Math.max(p.last,c.when);});
  var langs={},size=0,otherN={};files.forEach(function(fl){size+=fl.size||0;if(BIN.test(fl.path))return;var L=langOf(fl.path),k=L<0?"Other":LANGS[L][0];langs[k]=(langs[k]||0)+(fl.size||0);if(L<0){var e=(fl.path.split("/").pop().split(".").slice(1).pop()||"").toLowerCase();if(e)otherN[e]=1;}});
  return {versions:all.length,full:!!all.full,weeks:weeks,people:Object.keys(people).map(function(k){return people[k];}).sort(function(a,b){return b.n-a.n;}),langs:langs,other:Object.keys(otherN).slice(0,6),files:files.length,size:size};});}
function linesData(r){var ref=r.detached?r.head:"refs/heads/"+r.branch;return IngRepo.log(r.id,{ref:ref,max:20}).then(function(l){return seq(l,function(c){return IngRepo.diff(r.id,{from:c.parents[0]||"empty",to:c.oid,context:0,limit:(window.ingFabMB?2*window.ingFabMB.history:6)*1048576}).then(function(d){var a=0,dd=0,big=0;
  d.forEach(function(x){a+=x.adds;dd+=x.dels;if(!x.binary&&!x.hunks.length&&x.kind!=="moved"&&x.kind!=="mode"&&(x.oldSize+x.newSize)>(window.ingFabMB?2*window.ingFabMB.history:6)*1048576)big++;});return {c:c,adds:a,dels:dd,files:d.length,big:big};});});});}
function day(t){return new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"short"});}
function paintInsights(r,w,f){var rec=needRec(r,w,"the insights");if(!rec)return;var v=V(r).ins;sig(r,"insights");
  if(!r.head){w.appendChild(h("div","f-empty h-blk","<b>No insights yet</b>Keep a first version, and what the app holds and how it grows shows here."));return;}
  var key=gk(r,"ins"),d=want(key,function(){return insData(r);});if(d===undefined)return waitBox(w,"Counting…");if(isErr(d))return errBox(w,d.__err,key);
  var iO=rec.issues.filter(function(x){return x.state==="open";}).length,pO=rec.pulls.filter(function(x){return x.state==="open";}).length,pM=rec.pulls.filter(function(x){return x.state==="merged";}).length;
  var g=h("div","h-ins h-blk");g.id="hInsTotals";
  [["versions",(d.full?"over ":"")+d.versions.toLocaleString("en-GB"),"versions kept"],["ideas",r.branches.length,r.branches.length===1?"idea":"ideas"],["releases",r.tags.length,r.tags.length===1?"release":"releases"],["files",d.files.toLocaleString("en-GB"),"files now · "+kb(d.size)],
   ["issues",iO+" open",(rec.issues.length-iO)+" closed issues"],["pulls",pO+" open",pM+" merged · "+(rec.pulls.length-pO-pM)+" closed pull requests"],["runs",rec.runs.length,rec.runs.length===1?"run of the checks":"runs of the checks"]].forEach(function(s){var e=h("div","h-stat");e.setAttribute("data-k",s[0]);e.innerHTML="<b>"+esc(s[1])+"</b><span>"+esc(s[2])+"</span>";g.appendChild(e);});
  w.appendChild(g);
  /* versions per week: one series, so one colour and no legend; the table carries every value, and the hover and focus say each week */
  var tot=d.weeks.reduce(function(a,x){return a+x.n;},0),mx=Math.max.apply(null,d.weeks.map(function(x){return x.n;})),mi=-1;d.weeks.forEach(function(x,i){if(x.n===mx&&mi<0)mi=i;});
  var sh=h("h3","h-sub h-blk","Versions kept each week");sh.appendChild(T("span","f-chip","the last 16 weeks · "+tot));var tg=btn("quiet sm",v.table?"Show as bars":"Show as a table",function(){v.table=!v.table;repaint();});tg.style.marginLeft="auto";sh.appendChild(tg);w.appendChild(sh);
  if(v.table){var tb=h("table","h-tbl h-blk");tb.innerHTML="<thead><tr><th>The week of</th><th class='n'>Versions</th></tr></thead><tbody>"+d.weeks.map(function(x){return "<tr><td>"+esc(day(x.start))+"</td><td class='n'>"+x.n+"</td></tr>";}).join("")+"</tbody>";w.appendChild(tb);}
  else{var ch=h("div","h-chart h-blk");ch.id="hInsWeeks";ch.setAttribute("role","group");ch.setAttribute("aria-label",tot+" versions in the last 16 weeks"+(mx?"; the most, "+mx+", in the week of "+day(d.weeks[mi].start):""));var tip=h("div","h-tip");tip.hidden=true;ch.appendChild(tip);
    d.weeks.forEach(function(x,i){var c=h("div","h-colb");c.tabIndex=0;c.setAttribute("role","img");c.setAttribute("aria-label","The week of "+day(x.start)+": "+plural(x.n,"version"));var bar=h("i");bar.style.height=(mx?Math.max(x.n?3:0,100*x.n/mx):0)+"%";c.appendChild(bar);
      if(x.n&&(i===mi||i===15))c.insertBefore(T("span","h-v",String(x.n)),bar).style.bottom=(mx?100*x.n/mx:0)+"%";
      function on(){tip.hidden=false;tip.textContent="The week of "+day(x.start)+": "+plural(x.n,"version");tip.style.left=(c.offsetLeft+c.offsetWidth/2)+"px";tip.style.top=(c.offsetTop+c.offsetHeight*(1-(mx?x.n/mx:0))+14)+"px";}
      c.addEventListener("mouseenter",on);c.addEventListener("focus",on);c.addEventListener("mouseleave",function(){tip.hidden=true;});c.addEventListener("blur",function(){tip.hidden=true;});ch.appendChild(c);});
    w.appendChild(ch);var ax=h("div","h-axis h-blk");ax.setAttribute("aria-hidden","true");d.weeks.forEach(function(x,i){ax.appendChild(T("span",null,i%4===0||i===15?day(x.start):""));});w.appendChild(ax);}
  w.appendChild(T("h3","h-sub h-blk","Contributors"));var wb=h("div","h-who h-blk");wb.id="hInsWho";var pm=d.people.length?d.people[0].n:1;
  d.people.slice(0,12).forEach(function(p){var row=h("div");row.appendChild(T("b",null,p.name));var br=h("div");var bi=h("div","h-bar1");bi.style.width=Math.max(2,100*p.n/pm)+"%";br.appendChild(bi);row.appendChild(br);row.appendChild(T("span","f-hint",plural(p.n,"version")+" · since "+day(p.first))).style.margin="0";wb.appendChild(row);});w.appendChild(wb);
  var lk=Object.keys(d.langs).filter(function(k){return d.langs[k]>0;}).sort(function(a,b){return (a==="Other")-(b==="Other")||d.langs[b]-d.langs[a];}),lt=lk.reduce(function(a,k){return a+d.langs[k];},0);
  w.appendChild(T("h3","h-sub h-blk","Languages"));
  if(!lt)w.appendChild(T("p","h-note2 h-blk","No text files to count."));else{var lb=h("div","h-langbar h-blk");lb.setAttribute("aria-hidden","true");var ul=h("ul","h-langs h-blk");ul.id="hInsLangs";
    lk.forEach(function(k){var i=-1;LANGS.forEach(function(L,j){if(L[0]===k)i=j;});var col="var(--h-c"+(i<0?0:i+1)+")",pc=100*d.langs[k]/lt,seg=h("i");seg.style.width=pc+"%";seg.style.background=col;seg.title=k+" "+pc.toFixed(1)+"%";lb.appendChild(seg);
      var li=h("li");var dot=h("i");dot.style.background=col;li.appendChild(dot);li.appendChild(T("span",null,k+(k==="Other"&&d.other.length?" ("+d.other.join(", ")+")":"")));li.appendChild(T("small",null,pc.toFixed(1)+"% · "+kb(d.langs[k])));ul.appendChild(li);});
    w.appendChild(lb);w.appendChild(ul);}
  var lh=h("h3","h-sub h-blk","Lines added and taken away");lh.appendChild(T("span","f-chip","the last 20 versions"));w.appendChild(lh);
  if(!v.lines){var p1=T("p","h-note2 h-blk","Counted when you ask: each of the last 20 versions is read against the one before it.");w.appendChild(p1);var ck=btn("","Count the lines",function(){v.lines=true;repaint(true);});ck.id="hInsLines";var rw=h("div","h-bar h-blk");rw.appendChild(ck);w.appendChild(rw);return;}
  var lkey=gk(r,"lines"),ld=want(lkey,function(){return linesData(r);});if(ld===undefined)return waitBox(w,"Reading the last 20 versions, line by line…");if(isErr(ld))return errBox(w,ld.__err,lkey);
  var A=0,D=0,big=0,m2=1;ld.forEach(function(x){A+=x.adds;D+=x.dels;big+=x.big;m2=Math.max(m2,x.adds,x.dels);});
  var key2=h("div","h-key h-blk");key2.innerHTML='<span><i style="background:var(--f-add)"></i>added: '+A.toLocaleString("en-GB")+'</span><span><i style="background:var(--f-del)"></i>taken away: '+D.toLocaleString("en-GB")+"</span>";key2.id="hInsLineSum";w.appendChild(key2);
  var lw=h("div","h-lines h-blk");lw.id="hInsLineRows";ld.forEach(function(x){var row=h("div");row.title=x.c.title+": "+x.adds+" added, "+x.dels+" taken away";row.appendChild(T("span","t",x.c.short+" "+x.c.title));
    var pa=h("span","p"),ia=h("i");ia.style.width=Math.round(70*x.adds/m2)+"%";pa.appendChild(ia);pa.appendChild(document.createTextNode("+"+x.adds.toLocaleString("en-GB")));row.appendChild(pa);
    var pd=h("span","q"),id2=h("i");id2.style.width=Math.round(70*x.dels/m2)+"%";pd.appendChild(id2);pd.appendChild(document.createTextNode("−"+x.dels.toLocaleString("en-GB")));row.appendChild(pd);lw.appendChild(row);});w.appendChild(lw);
  if(big)w.appendChild(T("p","h-note2 h-blk",plural(big,"very large file")+" could not be counted line by line."));}

/* ======================= SETTINGS ======================= */
function paintSettings(r,w,f){var rec=needRec(r,w,"the settings");if(!rec)return;sig(r,"settings");var a=rec.about;
  var s1=h("div","h-box h-blk");s1.innerHTML='<b class="h-big">About '+esc(r.name)+"</b>";var fm=h("div","h-form");fm.style.padding="8px 0 0";
  function field(label,val,id,ph,hint){var l=h("label");l.appendChild(T("span",null,label));var i=h("input");i.type="text";i.id=id;i.value=val||"";i.placeholder=ph||"";l.appendChild(i);if(hint)l.appendChild(T("small","f-hint",hint));fm.appendChild(l);return i;}
  var fd=field("Its description",a.desc||r.desc||"","hSetDesc","What it is, in one line"),fs=field("Its website",a.site,"hSetSite","https://…","Where it lives on the web, if anywhere."),ft=field("Its topics",a.topics.join(", "),"hSetTopics","notes, offline, family","Words to find it by, separated by commas.");
  s1.appendChild(fm);var r1=h("div","f-row"),sv=btn("pri","Save",function(){var site=fs.value.trim();if(site&&!/^https?:\/\/[^\s]+$/i.test(site)){if(/^[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(site))site="https://"+site;else{fs.focus();toast("A website begins with https://");return;}}
    a.desc=fd.value.trim();a.site=site;a.topics=ft.value.split(/[,;]+/).map(function(t){return t.trim().toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"").slice(0,35);}).filter(Boolean).filter(function(t,i,arr){return arr.indexOf(t)===i;}).slice(0,20);
    sv.disabled=true;keep(rec).then(function(){return a.desc!==(r.desc||"")?IngRepo.rename(r.id,null,a.desc):null;}).then(function(){toast("Kept.");sv.disabled=false;return again();}).catch(function(e){sv.disabled=false;fail(e);});});sv.id="hSetSave";r1.appendChild(sv);s1.appendChild(r1);w.appendChild(s1);
  var s2=h("div","h-box h-blk");s2.innerHTML='<b class="h-big">A star</b>A starred app stands first in Your apps.';var r2=h("div","f-row"),st=btn("h-star",rec.star?"★ Starred":"☆ Star",function(){rec.star=!rec.star;var H=hs(),i=H.stars.indexOf(r.id);if(rec.star&&i<0)H.stars.push(r.id);if(!rec.star&&i>=0)H.stars.splice(i,1);stSave();
    keep(rec).then(function(){toast(rec.star?r.name+" is starred: it stands first in Your apps.":"The star is taken away.");return again();});});st.id="hSetStar";st.setAttribute("aria-pressed",rec.star?"true":"false");r2.appendChild(st);s2.appendChild(r2);w.appendChild(s2);
  if(r.branches.length>1){var s3=h("div","h-box h-blk");s3.innerHTML='<b class="h-big">The main idea</b>Where pull requests go by default, and where a version that says “fixes #3” closes issue 3.';var r3=h("div","f-row");
    var sel=picker(r.branches.map(function(b){return {v:b,t:b};}),defBranch(r,rec),"The main idea",function(x){rec.defBranch=x;keep(rec).then(function(){toast(x+" is the main idea.");SCANSIG[r.id]="";});});sel.id="hSetDef";r3.appendChild(sel);s3.appendChild(r3);w.appendChild(s3);}
  var s4=h("div","h-box h-blk");s4.id="hSetLabels";s4.innerHTML='<b class="h-big">Labels</b>';
  rec.labels.forEach(function(l,i){var row=h("div","h-labrow");var col=h("input","h-col-in");col.type="color";col.value=/^#[0-9a-f]{6}$/i.test(l.color)?l.color:"#8a8296";col.setAttribute("aria-label","The colour of "+l.name);
    var nm=h("input");nm.type="text";nm.value=l.name;nm.setAttribute("aria-label","The label's name");var ds=h("input","h-ld");ds.type="text";ds.value=l.desc||"";ds.placeholder="What it means";ds.setAttribute("aria-label","What "+l.name+" means");
    var prevw=labChip(rec,l.name);function look(){prevw.textContent=nm.value||"label";prevw.style.setProperty("--lc",col.value);prevw.style.setProperty("--lt",inkOn(col.value));}col.oninput=look;nm.oninput=look;
    row.appendChild(col);row.appendChild(nm);row.appendChild(ds);
    var sk=btn("sm","Save",function(){var n2=nm.value.trim().slice(0,50);if(!n2){nm.focus();return;}if(n2!==l.name&&labelOf(rec,n2)){toast("There is a label called “"+n2+"” already.");return;}
      var old=l.name;l.name=n2;l.color=col.value;l.desc=ds.value.trim();if(old!==n2)rec.issues.concat(rec.pulls).forEach(function(it){var j=it.labels.indexOf(old);if(j>=0)it.labels[j]=n2;});keep(rec).then(function(){toast("The label “"+n2+"” is kept.");repaint(true);});});
    var rm=btn("quiet sm","Remove",function(){ask("Remove the label “"+l.name+"”?","It is taken off every issue that has it.","Remove it",true).then(function(y){if(!y)return;rec.labels.splice(rec.labels.indexOf(l),1);rec.issues.concat(rec.pulls).forEach(function(it){it.labels=it.labels.filter(function(x){return x!==l.name;});});keep(rec).then(function(){repaint(true);});});});
    rm.style.color="var(--f-del)";row.appendChild(sk);row.appendChild(rm);s4.appendChild(row);});
  var r4=h("div","f-row"),nl=btn("sm","＋ New label",function(){askLine("A new label","Its name: urgent, design, later…","",function(n2){n2=n2.slice(0,50);if(labelOf(rec,n2))throw new Error("there is a label called “"+n2+"” already");var hues=["#e99695","#fbca04","#0e8a16","#1d76db","#5319e7","#c5def5","#bfd4f2","#d4c5f9"];rec.labels.push({name:n2,color:hues[rec.labels.length%hues.length],desc:""});return keep(rec).then(function(){repaint(true);});});});nl.id="hSetNewLabel";r4.appendChild(nl);
  r4.appendChild(btn("quiet sm","Put back the first five",function(){LABELS0.forEach(function(l){if(!labelOf(rec,l.name))rec.labels.push(clone(l));});keep(rec).then(function(){repaint(true);});}));s4.appendChild(r4);w.appendChild(s4);
  var s5=h("div","h-box h-blk");s5.innerHTML='<b class="h-big">Fork</b>A new app with this one\'s whole history: every version, idea and release, to take in another direction. This app is not touched. Changes not kept yet stay here.';
  var r5=h("div","f-row"),fk=btn("","Fork "+r.name,function(){if(!r.head){toast("Keep a first version first.");return;}askLine("Fork "+r.name,"The new app's name.",r.name+" fork",function(nm){return fork(r,nm).then(function(id){openApp(id,"history");toast(nm+" is here, with the whole history of "+r.name+".");});});});fk.id="hSetFork";r5.appendChild(fk);s5.appendChild(r5);w.appendChild(s5);
  var s6=h("div","h-box h-blk");s6.innerHTML='<b class="h-big">Use as a template</b>A new app that starts from this one\'s files as they are in the version kept now, with a fresh history of its own.';
  var r6=h("div","f-row"),tp=btn("","Use as a template",function(){if(!r.head){toast("Keep a first version first.");return;}askLine("A new app from "+r.name,"The new app's name.","",function(nm){return template(r,nm).then(function(id){openApp(id,"history");toast(nm+" is here, made from "+r.name+".");});},"My new app");});tp.id="hSetTpl";r6.appendChild(tp);s6.appendChild(r6);w.appendChild(s6);
  /* the store's copy, in the owner's hands: every app's issues, pull requests, wiki, board, runs and labels in one file, to keep
     or to carry to another device (the apps themselves travel as a folder for git, or their whole history in one file) */
  var s7=h("div","h-box h-blk");s7.innerHTML='<b class="h-big">Issues and pages, in one file</b>The issues, pull requests, wiki, board, runs and labels of every app in Fabrica, in one file to keep, or to bring to another device. The apps themselves are saved apart, as A folder for git under Test and ship; on another device each app\'s notes find it by its name.';
  var r7=h("div","f-row"),ex=btn("","Save a copy",function(){ex.disabled=true;exportAll().then(function(d){var x=X(),nm="fabrica-issues-and-pages-"+new Date().toISOString().slice(0,10)+".json";
      return x.saveBytes(nm,"application/json",new TextEncoder().encode(JSON.stringify(d))).then(function(){toast("Saved: "+nm+", with the notes of "+plural(d.apps.length,"app")+".");});}).then(function(){ex.disabled=false;},function(e){ex.disabled=false;fail(e);});});ex.id="hSetExport";
  var fi=h("input");fi.type="file";fi.accept=".json,application/json";fi.hidden=true;fi.id="hSetImportFile";fi.setAttribute("aria-label","A copy of Fabrica's issues and pages to bring back");
  fi.onchange=function(){var file=fi.files&&fi.files[0];if(!file)return;
    (file.text?file.text():new Response(file).text()).then(function(t){try{var d=JSON.parse(t);}catch(e){throw new Error("that is not a backup of Fabrica's issues and pages");}if(!d||d.kind!=="ingenium-hub"||!Array.isArray(d.apps))throw new Error("that is not a backup of Fabrica's issues and pages");
      return ask("Bring back the issues and pages in “"+file.name+"”?","It holds the notes of "+plural(d.apps.length,"app")+". For each of them, what the copy holds takes the place of what is here now. Apps the copy does not name are not touched.","Bring them back",false,"Not now").then(function(y){return y?importAll(d):null;});})
    .then(function(res){fi.value="";if(res){toast("Brought back: the notes of "+plural(res.apps,"app")+(res.byName?", "+res.byName+" found by name":"")+"."+(res.skipped?" "+plural(res.skipped,"app")+" in the copy "+(res.skipped===1?"is":"are")+" not in Fabrica here: bring "+(res.skipped===1?"it":"them")+" in, then bring the copy back again.":""));repaint(true);}},function(e){fi.value="";fail(e);});};
  var im=btn("","Bring a copy back",function(){fi.click();});im.id="hSetImport";r7.appendChild(ex);r7.appendChild(im);r7.appendChild(fi);s7.appendChild(r7);w.appendChild(s7);
  w.appendChild(T("p","h-note2 h-blk","To rename this app, or to remove it from Fabrica, use ⋯ beside its name above."));}
/* a fork: the bundle of every version, brought in as an app of its own (without the family app's own package id, so a fork's
   package never installs over the app it came from) */
function fork(r,name){return IngRepo.bundle(r.id).then(function(b){return Promise.resolve().then(function(){return IngRepo.fromBundle(b,{name:name,desc:r.desc||""});});}).then(function(x){var src=REC[r.id];return recP(x.id).then(function(nr){nr.forkOf={id:r.id,name:r.name,at:Date.now()};
  if(src){nr.labels=clone(src.labels);nr.about=clone(src.about);}return keep(nr);}).then(function(){return x.id;});});}
function template(r,name){return IngRepo.files(r.id,r.head).then(function(list){return seq(list,function(fl){return blob(fl.oid).then(function(b){return {path:fl.path,data:b,mode:fl.mode};});});})
  .then(function(files){if(!files.length)throw new Error("there are no files in the version kept now");return IngRepo.fromFiles(files,{name:name,desc:r.desc||"",msg:"First version, from the template "+r.name});})
  .then(function(x){var src=REC[r.id];return recP(x.id).then(function(nr){nr.from={id:r.id,name:r.name,at:Date.now()};if(src)nr.labels=clone(src.labels);return keep(nr);}).then(function(){return x.id;});});}
function openApp(id,view){var x=X();if(!x)return;x.FBS().sel=id;x.saveSoon();x.S.view=view||"history";x.S.file=0;x.S.cmp=null;try{x.C.diff={};x.C.files={};x.C.log={};}catch(e){}x.refresh().then(function(){x.paint();});}

/* ======================= what Fabrica and the backup see ======================= */
/* each app's record goes with its name: on another device an app brought in from its git folder or its bundle has a new id,
   and its notes find it by its name there */
function namesHere(){return IngRepo.list().then(function(rs){return Array.isArray(rs)?rs:[];},function(){return [];});}
function exportAll(){return Promise.all([allRecs().catch(function(){return [];}),namesHere()]).then(function(x){var m={},nm={};x[0].forEach(function(r){m[r.id]=r;});Object.keys(REC).forEach(function(id){m[id]=REC[id];});
  x[1].forEach(function(r){nm[r.id]=r.name;});
  return {kind:"ingenium-hub",version:1,at:Date.now(),stars:hs().stars.slice(),apps:Object.keys(m).map(function(id){var c=clone(m[id]);if(nm[id])c.name=nm[id];return c;})};});}
function importAll(data){try{if(typeof data==="string")data=JSON.parse(data);}catch(e){return Promise.reject(new Error("that is not a backup of Fabrica's issues and pages"));}
  if(!data||data.kind!=="ingenium-hub"||!Array.isArray(data.apps))return Promise.reject(new Error("that is not a backup of Fabrica's issues and pages"));
  return namesHere().then(function(rs){var ids={},byName={},moved={},n=0,skipped=0;rs.forEach(function(r){ids[r.id]=1;(byName[r.name]=byName[r.name]||[]).push(r.id);});
    var named={};data.apps.forEach(function(x){if(x&&typeof x.id==="string")named[x.id]=1;});
    return seq(data.apps,function(x){if(!x||typeof x.id!=="string"||!x.id)return;var id=x.id;
      /* an id not on this device: the one app here of the same name, if no other record in the copy is already its own */
      if(!ids[id]&&x.name&&byName[x.name]&&byName[x.name].length===1&&!named[byName[x.name][0]]){moved[id]=byName[x.name][0];id=moved[id];}
      /* the notes of an app that is not here are left in the copy: bring the app in first, then the copy again */
      if(rs.length&&!ids[id]){skipped++;return;}var rec=norm(clone(x),id);rec.id=id;delete rec.name;REC[id]=rec;delete RECERR[id];n++;return putRec(rec);})
    .then(function(){var st=hs();
      (data.stars||[]).concat(data.apps.filter(function(x){return x&&x.star;}).map(function(x){return x.id;})).forEach(function(id){id=moved[id]||id;if(typeof id==="string"&&st.stars.indexOf(id)<0)st.stars.push(id);});stSave();SCANSIG={};DONE={};repaint();
      return {apps:n,skipped:skipped,byName:Object.keys(moved).length};});});}

var VIEWS=[["code","Code"],["issues","Issues"],["pulls","Pull requests"],["compare","Compare"],["actions","Actions"],["projects","Projects"],["wiki","Wiki"],["insights","Insights"],["settings","Settings"]];
var HUB=window.fbHub={version:"6.1",views:{code:paintCode,issues:paintIssues,pulls:paintPulls,compare:paintCompare,actions:paintActions,projects:paintProjects,wiki:paintWiki,insights:paintInsights,settings:paintSettings},
  md:function(s,o){return md(s,o||{});},exportAll:exportAll,importAll:importAll,record:function(id){return recP(id).then(clone);},forget:forget,
  /* open a view of the chosen app: fbHub.open("issues",{n:3}), fbHub.open("compare",{a:"refs/tags/v1",b:"refs/heads/main"}) */
  open:function(view,o){var x=X();if(!x||!HUB.views[view])return false;var r=x.cur();if(!r)return false;o=o||{};var v=V(r);
    if(view==="compare"){if(o.a)v.cmp.a=o.a;if(o.b)v.cmp.b=o.b;}if(view==="issues"&&o.n!=null)v.iss.open=o.n;if(view==="pulls"&&o.n!=null)v.pr.open=o.n;if(view==="code"){if(o.ref)v.code.ref=o.ref;if(o.file!==undefined)v.code.file=o.file;}show(view);return true;},
  scan:function(id){return IngRepo.info(id).then(function(r){return recP(id).then(function(){return scan(r,true);});});},run:function(id,ref){return IngRepo.info(id).then(function(r){return runChecks(r,ref||r.head,"hand");});},
  _:{md:md,refsIn:refsIn,blame:function(id,ref,path){return IngRepo.info(id).then(function(r){return blame(r,ref,path);});},fileHistory:function(id,ref,path){return IngRepo.info(id).then(function(r){return fileHistory(r,ref,path);});},db:HUBDB}};

/* the engine's own steps, followed: a version kept or merged is read for the issues it closes (and checked when the owner
   asked for that); an app removed takes its record with it; starred apps come first in the list */
(function(){if(IngRepo.__r141)return;IngRepo.__r141=1;
  var c0=IngRepo.commit;IngRepo.commit=function(id){return c0.apply(IngRepo,arguments).then(function(oid){try{afterKept(id,oid);}catch(e){}return oid;});};
  var m0=IngRepo.merge;IngRepo.merge=function(id){return m0.apply(IngRepo,arguments).then(function(m){try{if(m&&(m.kind==="merged"||m.kind==="forward"))afterKept(id,m.commit);}catch(e){}return m;});};
  var v0=IngRepo.revert;if(v0)IngRepo.revert=function(id){return v0.apply(IngRepo,arguments).then(function(m){try{if(m&&m.commit)afterKept(id,m.commit);}catch(e){}return m;});};
  var d0=IngRepo.remove;IngRepo.remove=function(id){return d0.apply(IngRepo,arguments).then(function(x){return forget(id).then(function(){return x;});});};
  var l0=IngRepo.list;IngRepo.list=function(){return l0.apply(IngRepo,arguments).then(function(rs){var st=hs().stars;if(!st.length||!Array.isArray(rs))return rs;
    return rs.map(function(r,i){return {r:r,i:i,s:st.indexOf(r.id)>=0?0:1};}).sort(function(a,b){return a.s-b.s||a.i-b.i;}).map(function(x){return x.r;});});};})();

/* ---------- the tabs: nine more beside Fabrica's five; the row scrolls sideways when it is full ---------- */
var LASTVIEW="";
function ensureTabs(){var vb=$("fbViews");if(!vb)return false;if(!vb.querySelector('button[data-v="code"]')){
    VIEWS.forEach(function(x){var b=document.createElement("button");b.type="button";b.setAttribute("role","tab");b.setAttribute("data-v",x[0]);b.setAttribute("aria-selected","false");b.setAttribute("aria-controls","fbWorkBody");
      b.innerHTML=esc(x[1])+(x[0]==="issues"||x[0]==="pulls"?'<span class="n" hidden></span>':"");
      b.onclick=function(){var hh=X();if(!hh)return;toTop(hh,x[0]);hh.S.view=x[0];hh.S.cmp=null;hh.S.file=0;var w=$("fbWorkBody");if(w)w.scrollTop=0;hh.paintWork();try{hh.thumbs();}catch(e){}tabIntoView();};vb.appendChild(b);});
    [].forEach.call(vb.querySelectorAll('button[data-v]'),function(b){b.setAttribute("aria-controls","fbWorkBody");});
    wireTabs(vb);}
  watchWork();decorateSoon();return true;}
/* a press on a tab goes to the top of that view, as on GitHub: Issues to the list of issues, Code to the app's first folder.
   Words being written are not lost: a new issue or pull request keeps its draft, and a wiki page being edited stays open. */
function toTop(hh,view){var r=null;try{r=hh.cur();}catch(e){}if(!r)return;var v=V(r);
  if(view==="code"){v.code.file=null;v.code.dir="";v.code.res=false;v.code.line=0;}
  else if(view==="issues")v.iss.open=null;
  else if(view==="pulls"){v.pr.open=null;v.pr.tab="conv";}
  else if(view==="wiki"&&v.wiki.mode==="hist"){v.wiki.mode="view";v.wiki.rev=null;}}
function wireTabs(vb){if(vb.__h)return;vb.__h=1;
  vb.addEventListener("wheel",function(e){if(vb.scrollWidth<=vb.clientWidth+2)return;if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){vb.scrollLeft+=e.deltaY;e.preventDefault();}},{passive:false});
  vb.addEventListener("scroll",masks,{passive:true});window.addEventListener("resize",function(){setTimeout(masks,60);});
  /* the chosen tab stays in sight when the row changes width: a window made narrower, or the work shown on a phone after
     another panel (the row had no width while it was hidden) */
  try{var lastW=-1,ro=new ResizeObserver(function(){if(!vb.isConnected){ro.disconnect();return;}var cw=vb.clientWidth;if(cw!==lastW){lastW=cw;if(cw>0){tabIntoView();masks();}}});ro.observe(vb);}catch(e){}
  vb.addEventListener("keydown",function(e){if(["ArrowLeft","ArrowRight","Home","End"].indexOf(e.key)<0)return;var bs=[].slice.call(vb.querySelectorAll('button[role="tab"]')),i=bs.indexOf(document.activeElement);if(i<0)return;e.preventDefault();
    var j=e.key==="Home"?0:e.key==="End"?bs.length-1:(i+(e.key==="ArrowRight"?1:-1)+bs.length)%bs.length;bs[j].focus();var l=bs[j].offsetLeft;if(l<vb.scrollLeft||l+bs[j].offsetWidth>vb.scrollLeft+vb.clientWidth)vb.scrollLeft=l-vb.clientWidth/2+bs[j].offsetWidth/2;});
  setTimeout(masks,100);}
function masks(){var vb=$("fbViews");if(!vb)return;var over=vb.scrollWidth>vb.clientWidth+2;vb.classList.toggle("h-ml",over&&vb.scrollLeft>4);vb.classList.toggle("h-mr",over&&vb.scrollLeft<vb.scrollWidth-vb.clientWidth-4);}
function tabIntoView(){var vb=$("fbViews");if(!vb)return;var on=vb.querySelector('button[aria-selected="true"]');if(!on||!on.offsetWidth)return;var l=on.offsetLeft,rt=l+on.offsetWidth;
  if(l<vb.scrollLeft+24)vb.scrollLeft=Math.max(0,l-48);else if(rt>vb.scrollLeft+vb.clientWidth-24)vb.scrollLeft=rt-vb.clientWidth+48;setTimeout(masks,350);}
var WATCHED=null,DT=0;
function watchWork(){var wb=$("fbWorkBody");if(!wb||WATCHED===wb)return;WATCHED=wb;
  try{new MutationObserver(decorateSoon).observe(wb,{childList:true});var rp=$("fbRepos");if(rp)new MutationObserver(starTiles).observe(rp,{childList:true});}catch(e){}}
function decorateSoon(){clearTimeout(DT);DT=setTimeout(decorate,30);}
function decorate(){var x=X();if(!x||!$("fb"))return;var r=null;try{r=x.cur();}catch(e){}counts(r);historyKeys(r,x);starTiles();masks();
  var vw=x.S.view+"|"+(r?r.id:"");if(vw!==LASTVIEW){LASTVIEW=vw;tabIntoView();}}
function counts(r,noScan){var vb=$("fbViews");if(!vb)return;var rec=r?recOf(r):null;
  [["issues",function(x){return x.issues;}],["pulls",function(x){return x.pulls;}]].forEach(function(k){var b=vb.querySelector('button[data-v="'+k[0]+'"] .n');if(!b)return;var n=rec?k[1](rec).filter(function(i){return i.state==="open";}).length:0;b.textContent=n?String(n):"";b.hidden=!n;});
  if(rec&&r&&!noScan)scanSoon(r);}
/* the open issues and pull requests counted on their tabs the moment a record changes, not at the next paint */
function badges(rec){var x=X(),r=null;if(!x||!$("fbViews"))return;try{r=x.cur();}catch(e){}if(r&&rec&&r.id===rec.id)counts(r,true);}
function historyKeys(r,x){if(!r||x.S.view!=="history")return;[].forEach.call(document.querySelectorAll('#fbWorkBody .f-cm[aria-expanded="true"] .f-acts, #fbWorkBody .f-cm[data-open="true"] .f-acts'),function(acts){if(acts.querySelector(".h-cmpk"))return;var card=acts.closest(".f-cm"),idEl=card&&card.querySelector(".id");if(!idEl)return;var short=idEl.textContent.trim();
  function go2(fn){return function(ev){ev.stopPropagation();IngRepo.resolve(r.id,short).then(function(oid){return IngRepo.log(r.id,{ref:oid,max:1});}).then(function(l){if(l[0])fn(l[0]);},fail);};}
  var k=btn("sm h-cmpk","Compare",go2(function(c){var cv=V(r).cmp;cv.a=c.parents[0]||"empty";cv.b=c.oid;cv.focus=null;show("compare");}));k.title="Set this version beside any other, line by line";acts.appendChild(k);
  acts.appendChild(btn("sm h-brk","Browse the files",go2(function(c){var cd=V(r).code;cd.ref=c.oid;cd.file=null;cd.dir="";cd.res=false;show("code");})));});}
function starTiles(){var x=X(),box=$("fbRepos");if(!x||!box)return;var st=hs().stars,tiles=box.querySelectorAll(".f-repo");
  [].forEach.call(tiles,function(t,i){var r=x.C.repos[i],on=!!(r&&st.indexOf(r.id)>=0),m=t.querySelector(".h-starmark");if(on&&!m){m=T("span","h-starmark","★");m.setAttribute("aria-hidden","true");t.appendChild(m);t.title="Starred";}else if(!on&&m){m.remove();t.removeAttribute("title");}});}
function hook(){return ensureTabs();}
var host=$("fbHost");if(host){try{new MutationObserver(function(){hook();}).observe(host,{childList:true});}catch(e){}}
if(!hook()&&!host){var tries=0,iv=setInterval(function(){if(hook()||++tries>180)clearInterval(iv);},1000);}
})();
;try{window.__ingParts["p62"]="running";}catch(_){}
</script>
