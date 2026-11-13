S='/tmp/claude-0/-home-user/e21db973-6f06-529c-bd20-f4b651dad94e/scratchpad'
pg=open(S+'/heads2/page.html',encoding='utf-8').read()
i=pg.find('<div class="wrap">')
head=pg[:i].replace('<title>Build and Focus Heads</title>','<title>Models and Blend Instruments</title>')
head=head.replace('.mini{margin-top:14px}','.mini{margin-top:14px}\n.ikey{position:absolute;left:260px;top:212px;width:0;height:0;z-index:4}\n.ikey .hx-seal{position:absolute;left:0;top:0;transform:translate(-50%,-50%)}\n#homeSeal{position:absolute;width:0;height:0;overflow:hidden}\n/*SEALCSS*/')
body=open(S+'/mb/body.html',encoding='utf-8').read()
open(S+'/mb/page.html','w',encoding='utf-8').write(head+body);print('page ok')
