# Takes modules out of a built Ingenium page, as built (names applied): from <style id="rNNN-css"> (or its first script) to its "running" line
import sys, re
page=open(sys.argv[1],encoding='utf-8').read(); out=sys.argv[2]
def block(name, part):
    end_mark='try{window.__ingParts["p%s"]="running";}catch(_){}' % part
    st=page.find('<style id="%s-css">' % name)
    if st<0:
        sm='__ingParts=window.__ingParts||{})["p%s"]="started"' % part; at=page.find(sm); st=page.rfind('<script',0,at)
    e=page.find(end_mark); e=page.find('</script>',e)+len('</script>')
    assert st>=0 and e>st, name
    return page[st:e]
mods=[('r290','290'),('r292','292'),('r314','314')]
for n,pn in mods:
    b=block(n,pn); open(out+'/'+n+'.built.html','w',encoding='utf-8').write(b); print(n, len(b))
