<script>
/* ============ R310 · THE SCENES REST WHEN NOBODY WATCHES THEM (Ingenium 7.27, 17 November 2026) ============
   Her words (17 November 2026): "The diamond on Adamas' page is still overheats my computer and my fan is still loud, not as much as
   before but it is loud, the same for the Vesta page and Lector and Fabrica."
   Measured at rest (rig/t_727_rest.js and rig/t_727_paint.js, Chrome at 1440 by 900, Retina sharpness; WebKit was not at hand): Adamas's
   scene, Vesta's stones and Fabrica's tree each asked the browser for a frame at every refresh of the screen (60 a second) and drew one
   in two or three of them; each of those wakes made the whole page restyle and repaint its moving seals (on Vesta 60 a second, against 8
   on Chat). Each also kept drawing while a strip of it was left on screen (Adamas scrolled down to its code: 25 pixels of the scene,
   drawn in full 15 times a second), and Vesta and the tree drew 30 frames a second at rest, Adamas 20.
   What this part keeps, for the scenes (modules r290, r291, r292, r294) to read when they set their pace:
   - idle(): Ingenium is not the window in use, or nothing was touched, clicked or typed for two minutes;
   - typing(): a key was pressed in a field or the code editor in the last five seconds (she is working there, not watching the scene).
   In the scenes themselves: each sleeps until its next frame is due (no wake at every refresh); each draws only while three tenths of
   it are in view below the top bar (a head's swaying parts, on Lector too, rest the same way); Vesta and the tree draw 20 frames a
   second at rest (30 before), as Adamas since 7.22, and all three draw 10 while idle() or typing(). Under the pointer, in a press or a
   flourish, each runs as before. Nothing here changes how anything looks while she watches it. */
(function(){var W=window,D=document;if(W.IngPace)return;var LASTIN=performance.now(),TYPED=-1e9;
  function field(t){return !!t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName||"")||!!(t.closest&&t.closest(".cm-editor,.CodeMirror,[contenteditable]")));}
  ["pointerdown","pointermove","keydown","wheel","touchstart"].forEach(function(n){try{D.addEventListener(n,function(e){LASTIN=performance.now();if(n==="keydown"&&field(e.target))TYPED=LASTIN;},{passive:true,capture:true});}catch(e){}});
  W.addEventListener("focus",function(){LASTIN=performance.now();});
  W.IngPace={idle:function(){return !(D.hasFocus?D.hasFocus():true)||performance.now()-LASTIN>120000;},typing:function(){return performance.now()-TYPED<5000;}};})();
</script>
