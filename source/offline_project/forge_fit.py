"""Fabrica's frame in the Forge follows the room's head while it moves (The Forge 641, 19 October 2026).

The frame fills what the window leaves below the room's head. It was fitted at 120 and 500 milliseconds after the room
opened, then every 700 milliseconds; when the help card above it was still unfolding after the second fit, the frame
stood up to about 45 pixels below the window's edge until the next tick. Now, while the room opens and just after any
press, the frame follows the head at every frame; the 700-millisecond check stays as it was. Used by forge_641/forge641.py
and carpe_diem_1058/cd1058.py, so the Forge, its copies and Carpe Diem's mini Forge come out the same."""

MOUNT_OLD = 'setTimeout(fit,120);setTimeout(fit,500);}catch(e){try{console.error("Fabrica",e);}catch(_){}}};'
MOUNT_NEW = ('setTimeout(fit,120);setTimeout(fit,500);if(window.__fbFollow)window.__fbFollow(1800);}'
             'catch(e){try{console.error("Fabrica",e);}catch(_){}}};')
TICK = ('var lastTop=null;setInterval(function(){var r=$("fb");if(!r||!roomOn())return;var se=document.scrollingElement||'
        'document.documentElement,top=Math.round(r.getBoundingClientRect().top+(se?se.scrollTop:0));if(top!==lastTop)'
        '{lastTop=top;fit();}},700);')
FOLLOW = ('\n/* 641: while the room opens, and just after a press (the help card unfolding above it), the frame follows the '
          'room\'s head\n   at every frame, so it never stands below the window\'s edge while the card moves */\n'
          'window.__fbFollow=function(ms){var end=Date.now()+ms;(function step(){var r=$("fb");if(!r||!roomOn())return;'
          'var se=document.scrollingElement||document.documentElement,top=Math.round(r.getBoundingClientRect().top+'
          '(se?se.scrollTop:0));if(top!==lastTop){lastTop=top;fit();}if(Date.now()<end)requestAnimationFrame(step);})();};\n'
          'document.addEventListener("click",function(){if($("fb")&&roomOn())window.__fbFollow(1200);},true);')


def fabrica(s):
    """A Forge page (lean, full, or Carpe Diem's mini Forge): Fabrica's frame follows the room's head."""
    for a, what in ((MOUNT_OLD, "Fabrica's mount"), (TICK, "Fabrica's 700-millisecond check")):
        if s.count(a) != 1:
            raise SystemExit("forge_fit: %s found %d times, 1 expected" % (what, s.count(a)))
    return s.replace(MOUNT_OLD, MOUNT_NEW).replace(TICK, TICK + FOLLOW)
