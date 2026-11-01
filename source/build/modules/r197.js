<style id="r197-css">
/* ============ R197 · A SIGN-IN OF HER OWN, AND HER DATA SEALED ON THE DEVICE (Ingenium 6.9.x, 31 October 2026) ============
   The owner's words (31 October 2026): "I also want for the data on the app to be protected with encryption so that my data is
   protected on the device. I also want an optional sign-in / login screen with user name and password."
   Off until she turns it on; with it off nothing changes. Turned on (from the welcome door, or Settings, Your data), Ingenium
   asks for a name and a password, shows a recovery phrase of ten words once, and from then on keeps the desk (chats, notes,
   settings, projects, the reading page's documents, Career) and the long texts (attachments, pages, documents) sealed on the
   device: AES-GCM under one random data key, which only the password (or the recovery phrase) unwraps. The page opens to a
   sign-in; a wrong password changes nothing; "Lock now" and an auto-lock after time away save first and start the page again
   with nothing of the session left. The keys live in a closure of this part for the session and are never written anywhere.
   What is sealed: localStorage "ingenium_v4" and its recovery shelf, the desk's overflow copy, IndexedDB "ingenium_big", the
   conversations brought in from elsewhere ("ingenium_claude"), the signing keys ("ingenium_keys") and Fabrica's issues and pages
   ("ingenium_hub"), and on the computer apps desk.json, big/*.txt and the keys' copies on disk (through the shell's own bridge).
   What is not: backups made by the Backup page (plain zips, as before), the carried apps' documents in their frames, model files,
   the app library, Fabrica's saved versions of apps, the engine. */
#ingLockDoor{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483001;display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;
  background:#f5f3f7;color:#221a2e;font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --ild-face-a:#ffffff;--ild-face-b:#f7f5fa;--ild-wall:#d3cbe0;--ild-ink:#221a2e;--ild-soft:rgba(70,58,92,.78);--ild-line:rgba(91,70,144,.30);--ild-fam:40,22,68;--ild-field:#ffffff;--ild-acc:#5b4690}
#ingLockDoor[hidden]{display:none}
#ingLockDoor.ild-night{background:#16131c;color:#efe9f6;--ild-face-a:#342a4c;--ild-face-b:#2c2341;--ild-wall:#140e1c;--ild-ink:#ece6f6;--ild-soft:rgba(236,230,246,.74);--ild-line:rgba(190,170,230,.34);--ild-fam:0,0,0;--ild-field:#1d1728;--ild-acc:#c9b8ee}
#ingLockDoor.ild-over{background:rgba(22,18,30,.58)}
#ingLockDoor .ild-card{width:min(470px,94vw);max-height:92vh;overflow:auto;box-sizing:border-box;padding:28px 28px 22px;border-radius:22px;color:var(--ild-ink);
  background:linear-gradient(180deg,var(--ild-face-a),var(--ild-face-b) 62%,color-mix(in srgb,var(--ild-face-b) 93%,var(--ild-wall)));
  box-shadow:inset 0 2px 0 rgba(255,255,255,.45),inset 2px 0 0 rgba(255,255,255,.25),inset -2px 0 0 var(--ild-wall),inset 0 -3px 0 var(--ild-wall),0 0 0 1px rgba(var(--ild-fam),.10),0 2px 3px rgba(var(--ild-fam),.10),0 9px 12px -7px rgba(var(--ild-fam),.18),0 22px 40px -14px rgba(var(--ild-fam),.26);
  animation:ildIn .46s cubic-bezier(.22,.8,.3,1) both}
@keyframes ildIn{0%{opacity:0;translate:0 12px;scale:.955}62%{opacity:1;translate:0 -2px;scale:1.008}100%{opacity:1;translate:0 0;scale:1}}
body[data-motion="minimal"] #ingLockDoor .ild-card{animation:none}
@media (prefers-reduced-motion:reduce){#ingLockDoor .ild-card{animation:none}}
#ingLockDoor h1{margin:0 0 2px;font:700 26px/1.15 "Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif;text-align:center;letter-spacing:.01em}
#ingLockDoor h2{margin:0 0 10px;font:600 19px/1.25 "Iowan Old Style","Palatino Linotype",Palatino,"Book Antiqua",Georgia,serif}
#ingLockDoor p{margin:0 0 12px;color:var(--ild-soft);font-size:14px;line-height:1.55}
#ingLockDoor p.ild-sub{text-align:center;margin-bottom:18px;font-size:15px}
#ingLockDoor label{display:block;margin:0 0 12px;font-size:13px;color:var(--ild-soft)}
#ingLockDoor label span{display:block;margin-bottom:5px}
#ingLockDoor input{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:10px 12px;border-radius:12px;border:1px solid var(--ild-line);background:var(--ild-field);color:var(--ild-ink);box-shadow:inset 0 1px 3px rgba(0,0,0,.08)}
#ingLockDoor input:focus-visible{outline:2px solid var(--ild-acc);outline-offset:1px}
#ingLockDoor .ild-keys{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;align-items:center;margin-top:14px}
#ingLockDoor .ild-keys .ild-link{margin-right:auto}
#ingLockDoor .ild-key{font:600 14px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:11px 18px;border-radius:12px;cursor:pointer;color:#fff;border:1px solid #4b2a86;
  background:linear-gradient(180deg,#7348be,#5d37a1);text-shadow:0 1px 1px rgba(30,10,60,.35);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.16),0 2px 0 #3a2070,0 4px 6px rgba(var(--ild-fam),.24),0 9px 16px rgba(var(--ild-fam),.16);transition:filter .16s ease,box-shadow .16s ease}
/* a key never moves under the pointer (it would flicker when the pointer rests on its lower edge): it brightens, and sinks into its shadow when pressed */
#ingLockDoor .ild-key:hover{filter:brightness(1.08)}
#ingLockDoor .ild-key:active{filter:brightness(.94);box-shadow:inset 0 2px 5px rgba(0,0,0,.30),0 1px 1px rgba(var(--ild-fam),.18)}
#ingLockDoor .ild-key:focus-visible{outline:3px solid #b79ce6;outline-offset:2px}
#ingLockDoor .ild-key[disabled]{opacity:.55;cursor:default;filter:none}
#ingLockDoor .ild-key.ild-ghost{color:var(--ild-ink);text-shadow:none;border:1px solid rgba(34,26,46,.12);background:linear-gradient(180deg,#ffffff,#efeaf4);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 2px 0 rgba(78,44,138,.18),0 4px 10px rgba(40,20,70,.12)}
#ingLockDoor.ild-night .ild-key.ild-ghost{background:linear-gradient(180deg,#2c2338,#211a2b);color:#efe9f6;border-color:rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 2px 0 rgba(0,0,0,.5),0 4px 10px rgba(0,0,0,.35)}
#ingLockDoor .ild-key.ild-danger{background:linear-gradient(180deg,#b04646,#8c2f2f);border-color:#4a1414;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 2px 0 #2a0a0a,0 4px 6px rgba(0,0,0,.25)}
#ingLockDoor .ild-link{background:none;border:0;padding:0;color:var(--ild-acc);text-decoration:underline;cursor:pointer;font:inherit;font-size:13.5px}
#ingLockDoor .ild-err{color:#8e2a2a;background:rgba(176,70,70,.10);padding:9px 11px;border-radius:10px;margin:0 0 12px;font-size:13.5px}
#ingLockDoor.ild-night .ild-err{color:#f2a9a9;background:rgba(240,120,120,.12)}
#ingLockDoor .ild-note{font-size:12.5px;color:var(--ild-soft);margin:14px 0 0;text-align:center}
#ingLockDoor .ild-words{display:grid;grid-template-columns:repeat(2,1fr);gap:4px 16px;margin:4px 0 14px;padding:12px 16px;border-radius:14px;background:rgba(var(--ild-fam),.06);font:17px/1.55 "Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;user-select:text}
#ingLockDoor .ild-words b{display:inline-block;width:1.7em;color:var(--ild-soft);font-weight:500;font-size:13px}
#ingLockDoor .ild-bar{width:100%;height:7px;border-radius:99px;background:rgba(106,63,181,.13);overflow:hidden;margin:6px 0 10px}
#ingLockDoor .ild-bar i{display:block;height:100%;width:2%;border-radius:inherit;background:linear-gradient(90deg,#8a63d2,#6a3fb5);transition:width .3s ease}
#ingLockDoor .ild-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}
#ingLockDoor .ild-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@media (max-width:480px){#ingLockDoor .ild-card{padding:22px 18px 18px}#ingLockDoor .ild-pair{grid-template-columns:1fr}#ingLockDoor .ild-words{grid-template-columns:1fr 1fr;font-size:16px}}
#ingLockCard .ild-top{display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px}
#ingLockCard .ild-top p{margin:0;flex:1 1 340px}
#ingLockCard .ild-row{display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin:4px 0}
#ingLockCard .ild-state{font-weight:600}
#ingLockCard select{font:inherit;font-size:13.5px;padding:5px 8px;border-radius:9px}
#ingLockCard p.small{line-height:1.5}
#ingLockCard details.ild-more{margin-top:4px}
#ingLockCard details.ild-more summary{cursor:pointer;font-size:13px;color:var(--ink-3);padding:2px 0}
#ingLockCard details.ild-more[hidden]{display:none}
#ingLockCard details.ild-more p{margin:6px 0 0}
.intro-protect-line{margin:14px auto 0;max-width:36ch;font-size:12.5px;line-height:1.5;color:var(--ink-3)}
.intro-protect-line .intro-tour{font-size:13.5px;margin-bottom:3px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p197"]="started";}catch(_){}
/* R197 · the sign-in and the seal: see the note at the top of its styles. window.IngLock is its door for the other parts:
   active() a lock is set up here; on() the keys are in hand and every write is sealed; ready() a promise kept once the keys
   are in hand (at once when no lock is set up); sealed(s), sealText/openText, deskWrite (the desk's writer, from saveState),
   adoptRaw/lockedNow (a sealed desk arriving from the larger store or the disk), openRecs/sealRecs (the Backup page),
   lockNow(). The recovery words below are the first 512 and must never be reordered: her phrase is read against them. */
(function r197(){"use strict";
if(window.IngLock)return;
var W_=window,D=document;
var WORDS="actor adobe agate agent alarm album alley anchor angle ankle anvil apple apron arbor arena argon armor arrow ash aspen atlas auburn autumn award axle badge bagel baker bamboo banjo barley barn basil basket baton beak bean beard beaver bell belt bench berry bishop bison blade blanket blaze bloom blossom boat bolt bonnet book booth border bottle bowl box brass bread breeze brick bridge bugle bulb bundle burrow cabin cable cactus cake candle canoe canvas canyon cape carbon card carpet carrot castle cedar cellar chalk chapel cherry chime cider cinder circle citrus clay cloak clock cloud clover coach coast cobalt coin collar comet compass copper coral cord cork cotton cradle crane crate crayon creek crest crown crumb crystal cup curtain cushion cymbal dancer dawn deer delta denim desert dial dinner dolphin dome donkey door dough dragon drawer drum duck dune dust eagle earth easel eclipse eel elbow elder elm ember emerald ermine essay evening ewe fable falcon farm fence fennel fern ferry fiddle field finch flag flame flask fleece flint flock flour flute fog forest fork fossil fox frame freckle fudge gable galaxy garden garlic gate gazelle gem giant ginger glacier glass globe glove goblet goose gourd grain granite grape grass grove guitar gull hammer harbor harp harvest hatch hazel heather hedge helmet heron hill hinge honey hook horizon horn horse hotel hour hummer ice igloo ink inlet iris iron ivory ivy jacket jade jar jasmine jelly jigsaw juniper kayak kernel kettle key kite kitten knot koala label lace ladder ladle lagoon lamp lantern lark latch laurel lava lawn ledger lemon lens lentil letter lever lilac linen lion lizard lobster locket lodge loft lotus lute lynx magnet mango mantle maple marble marsh mask meadow medal melon mesa meteor mint mirror mitten moat monkey moose morning moss moth motor mug mule mural music napkin nectar needle nest net newt nickel night north notch nutmeg oak oar oasis oat octave olive onion opal orange orbit organ oven owl oyster paddle page paint palace panda pansy paper parcel parrot patch pebble pedal pelican pencil penguin pepper petal pewter piano picnic pier pigeon pillow pilot pine pistol plaster plate plum pocket poem pond pony poppy porch potato pouch prairie prism pudding pumpkin puppet puzzle quail quartz quiver rabbit radio raft rain raisin raven reed ribbon rice ring river road robin rocket roof rope rowan ruby rudder rug saddle sage sail salt satin saucer scarf school scroll seal shadow shawl sheep shield ship shore shovel silk skate sketch skirt sled sleeve slipper snail soap sofa spade sparrow spice spider spindle spoon spring spruce stable stair stamp star steel stem stone stool stove straw string summer sun swan sweater sword syrup table tailor tassel teapot temple tent thimble thistle thread thunder ticket tiger timber tin toast tomato torch tower train tray tree tribe trout tulip tunnel turnip turtle twig uncle unicorn valley vase velvet vessel vine volcano voyage wafer wallet walnut walrus wand warren water wave weaver wedge whale wheat wheel whistle willow winter wire wolf wood wool wren yacht yarn yew yogurt zebra zenith zephyr zinc zipper".split(" ");
var LSK="ingenium_lock",CHECK="ingenium-lock-check v1",MIN_PW=8,N_WORDS=10,GZ_MIN=1024;
var TE=new TextEncoder(),TD=new TextDecoder();
function $(id){return D.getElementById(id);}
function warn(e){try{console.warn("R197",e&&e.message||e);}catch(_){}}
function rnd(n){var u=new Uint8Array(n);(W_.crypto||W_.msCrypto).getRandomValues(u);return u;}
function b64e(u8){var s="",CH=0x8000;for(var i=0;i<u8.length;i+=CH)s+=String.fromCharCode.apply(null,u8.subarray(i,i+CH));return btoa(s);}
function b64d(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function seq(list,fn){return list.reduce(function(p,x,i){return p.then(function(){return fn(x,i);});},Promise.resolve());}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function S(){try{if(W_.isSecureContext===false)return null;return (W_.crypto&&W_.crypto.subtle)||null;}catch(e){return null;}}
var GZ=typeof W_.CompressionStream==="function"&&typeof W_.DecompressionStream==="function"&&typeof W_.Response==="function";
function gz(u8){return new Response(new Blob([u8]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}
function gunz(u8){return new Response(new Blob([u8]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer().then(function(b){return new Uint8Array(b);});}

/* ---------- AES-256-GCM in plain JavaScript: only for the moment the window hides or closes, when the asynchronous
   WebCrypto cannot finish before the page is gone. The same bytes as WebCrypto's (the self-test below proves it). ---------- */
var SBOX=(function(){var s=new Uint8Array(256),p=1,q=1;function rl(x,n){return ((x<<n)|(x>>>(8-n)))&255;}
  do{p=(p^(p<<1)^((p&128)?0x1B:0))&255;q=(q^(q<<1))&255;q=(q^(q<<2))&255;q=(q^(q<<4))&255;if(q&128)q^=0x09;
    s[p]=(q^rl(q,1)^rl(q,2)^rl(q,3)^rl(q,4)^0x63)&255;}while(p!==1);s[0]=0x63;return s;})();
var TE0=new Uint32Array(256),TE1=new Uint32Array(256),TE2=new Uint32Array(256),TE3=new Uint32Array(256);
(function(){for(var i=0;i<256;i++){var s=SBOX[i],s2=((s<<1)^((s&128)?0x1B:0))&255,s3=s2^s,t=((s2<<24)|(s<<16)|(s<<8)|s3)>>>0;
  TE0[i]=t;TE1[i]=((t>>>8)|(t<<24))>>>0;TE2[i]=((t>>>16)|(t<<16))>>>0;TE3[i]=((t>>>24)|(t<<8))>>>0;}})();
function subw(t){return ((SBOX[t>>>24]<<24)|(SBOX[(t>>>16)&255]<<16)|(SBOX[(t>>>8)&255]<<8)|SBOX[t&255])>>>0;}
function expandKey(key){var w=new Uint32Array(60),i,rc=1;for(i=0;i<8;i++)w[i]=((key[4*i]<<24)|(key[4*i+1]<<16)|(key[4*i+2]<<8)|key[4*i+3])>>>0;
  for(i=8;i<60;i++){var t=w[i-1];if(i%8===0){t=subw(((t<<8)|(t>>>24))>>>0)^(rc<<24);rc=((rc<<1)^((rc&128)?0x1B:0))&255;}else if(i%8===4)t=subw(t);w[i]=(w[i-8]^t)>>>0;}return w;}
function encBlock(rk,inb,ip,out,op){
  var s0=(((inb[ip]<<24)|(inb[ip+1]<<16)|(inb[ip+2]<<8)|inb[ip+3])^rk[0])>>>0,s1=(((inb[ip+4]<<24)|(inb[ip+5]<<16)|(inb[ip+6]<<8)|inb[ip+7])^rk[1])>>>0,
      s2=(((inb[ip+8]<<24)|(inb[ip+9]<<16)|(inb[ip+10]<<8)|inb[ip+11])^rk[2])>>>0,s3=(((inb[ip+12]<<24)|(inb[ip+13]<<16)|(inb[ip+14]<<8)|inb[ip+15])^rk[3])>>>0,t0,t1,t2,t3,k=4;
  for(var r=1;r<14;r++){t0=(TE0[s0>>>24]^TE1[(s1>>>16)&255]^TE2[(s2>>>8)&255]^TE3[s3&255]^rk[k])>>>0;t1=(TE0[s1>>>24]^TE1[(s2>>>16)&255]^TE2[(s3>>>8)&255]^TE3[s0&255]^rk[k+1])>>>0;
    t2=(TE0[s2>>>24]^TE1[(s3>>>16)&255]^TE2[(s0>>>8)&255]^TE3[s1&255]^rk[k+2])>>>0;t3=(TE0[s3>>>24]^TE1[(s0>>>16)&255]^TE2[(s1>>>8)&255]^TE3[s2&255]^rk[k+3])>>>0;s0=t0;s1=t1;s2=t2;s3=t3;k+=4;}
  t0=(((SBOX[s0>>>24]<<24)|(SBOX[(s1>>>16)&255]<<16)|(SBOX[(s2>>>8)&255]<<8)|SBOX[s3&255])^rk[56])>>>0;t1=(((SBOX[s1>>>24]<<24)|(SBOX[(s2>>>16)&255]<<16)|(SBOX[(s3>>>8)&255]<<8)|SBOX[s0&255])^rk[57])>>>0;
  t2=(((SBOX[s2>>>24]<<24)|(SBOX[(s3>>>16)&255]<<16)|(SBOX[(s0>>>8)&255]<<8)|SBOX[s1&255])^rk[58])>>>0;t3=(((SBOX[s3>>>24]<<24)|(SBOX[(s0>>>16)&255]<<16)|(SBOX[(s1>>>8)&255]<<8)|SBOX[s2&255])^rk[59])>>>0;
  out[op]=t0>>>24;out[op+1]=(t0>>>16)&255;out[op+2]=(t0>>>8)&255;out[op+3]=t0&255;out[op+4]=t1>>>24;out[op+5]=(t1>>>16)&255;out[op+6]=(t1>>>8)&255;out[op+7]=t1&255;
  out[op+8]=t2>>>24;out[op+9]=(t2>>>16)&255;out[op+10]=(t2>>>8)&255;out[op+11]=t2&255;out[op+12]=t3>>>24;out[op+13]=(t3>>>16)&255;out[op+14]=(t3>>>8)&255;out[op+15]=t3&255;}
function jsGcm(keyBytes){var rk=expandKey(keyBytes),Hb=new Uint8Array(16),Z=new Uint8Array(16);encBlock(rk,Z,0,Hb,0);
  function words(b){return [((b[0]<<24)|(b[1]<<16)|(b[2]<<8)|b[3])>>>0,((b[4]<<24)|(b[5]<<16)|(b[6]<<8)|b[7])>>>0,((b[8]<<24)|(b[9]<<16)|(b[10]<<8)|b[11])>>>0,((b[12]<<24)|(b[13]<<16)|(b[14]<<8)|b[15])>>>0];}
  function shr1(v){var lsb=v[3]&1;v[3]=((v[3]>>>1)|(v[2]<<31))>>>0;v[2]=((v[2]>>>1)|(v[1]<<31))>>>0;v[1]=((v[1]>>>1)|(v[0]<<31))>>>0;v[0]=v[0]>>>1;if(lsb)v[0]=(v[0]^0xE1000000)>>>0;return v;}
  var M=[],R=new Uint32Array(16),i;M[0]=[0,0,0,0];M[8]=words(Hb);M[4]=shr1(M[8].slice());M[2]=shr1(M[4].slice());M[1]=shr1(M[2].slice());
  for(i=3;i<16;i++){if(M[i])continue;var lb=i&-i,a=M[i^lb],b=M[lb];M[i]=[(a[0]^b[0])>>>0,(a[1]^b[1])>>>0,(a[2]^b[2])>>>0,(a[3]^b[3])>>>0];}
  for(i=0;i<16;i++){var v=[0,0,0,i];shr1(v);shr1(v);shr1(v);shr1(v);R[i]=v[0];}
  /* Y = (Y xor block) times H, in place, four bits at a time */
  function mulH(y){var z0=0,z1=0,z2=0,z3=0,j,m,rem,bt;
    for(j=15;j>=0;j--){bt=(y[j>>2]>>>((3-(j&3))*8))&255;
      rem=z3&15;z3=((z3>>>4)|(z2<<28))>>>0;z2=((z2>>>4)|(z1<<28))>>>0;z1=((z1>>>4)|(z0<<28))>>>0;z0=((z0>>>4)^R[rem])>>>0;m=M[bt&15];z0=(z0^m[0])>>>0;z1=(z1^m[1])>>>0;z2=(z2^m[2])>>>0;z3=(z3^m[3])>>>0;
      rem=z3&15;z3=((z3>>>4)|(z2<<28))>>>0;z2=((z2>>>4)|(z1<<28))>>>0;z1=((z1>>>4)|(z0<<28))>>>0;z0=((z0>>>4)^R[rem])>>>0;m=M[bt>>>4];z0=(z0^m[0])>>>0;z1=(z1^m[1])>>>0;z2=(z2^m[2])>>>0;z3=(z3^m[3])>>>0;}
    y[0]=z0;y[1]=z1;y[2]=z2;y[3]=z3;}
  function ghashAdd(y,buf){var n=buf.length,full=n-(n%16),k=0;
    for(;k<full;k+=16){y[0]=(y[0]^(((buf[k]<<24)|(buf[k+1]<<16)|(buf[k+2]<<8)|buf[k+3])>>>0))>>>0;y[1]=(y[1]^(((buf[k+4]<<24)|(buf[k+5]<<16)|(buf[k+6]<<8)|buf[k+7])>>>0))>>>0;
      y[2]=(y[2]^(((buf[k+8]<<24)|(buf[k+9]<<16)|(buf[k+10]<<8)|buf[k+11])>>>0))>>>0;y[3]=(y[3]^(((buf[k+12]<<24)|(buf[k+13]<<16)|(buf[k+14]<<8)|buf[k+15])>>>0))>>>0;mulH(y);}
    if(k<n){var last=new Uint8Array(16);last.set(buf.subarray(k));y[0]=(y[0]^words(last)[0])>>>0;var w=words(last);y[1]=(y[1]^w[1])>>>0;y[2]=(y[2]^w[2])>>>0;y[3]=(y[3]^w[3])>>>0;mulH(y);}}
  function ctr(iv,n){var j=new Uint8Array(16);j.set(iv);j[12]=(n>>>24)&255;j[13]=(n>>>16)&255;j[14]=(n>>>8)&255;j[15]=n&255;return j;}
  function seal(iv,aad,pt){var n=pt.length,out=new Uint8Array(n+16),ks=new Uint8Array(16),c=2,k=0,i;
    for(;k<n;k+=16){encBlock(rk,ctr(iv,c++),0,ks,0);var e=Math.min(16,n-k);for(i=0;i<e;i++)out[k+i]=pt[k+i]^ks[i];}
    var y=[0,0,0,0];ghashAdd(y,aad);ghashAdd(y,out.subarray(0,n));
    var la=aad.length*8,lc=n*8;y[0]=(y[0]^Math.floor(la/4294967296))>>>0;y[1]=(y[1]^(la>>>0))>>>0;y[2]=(y[2]^Math.floor(lc/4294967296))>>>0;y[3]=(y[3]^(lc>>>0))>>>0;mulH(y);
    encBlock(rk,ctr(iv,1),0,ks,0);var tag=new Uint8Array(16);for(i=0;i<4;i++){var v=(y[i]^(((ks[4*i]<<24)|(ks[4*i+1]<<16)|(ks[4*i+2]<<8)|ks[4*i+3])>>>0))>>>0;tag[4*i]=v>>>24;tag[4*i+1]=(v>>>16)&255;tag[4*i+2]=(v>>>8)&255;tag[4*i+3]=v&255;}
    out.set(tag,n);return out;}
  return {seal:seal};}

/* ---------- WebCrypto: a key from the password or the phrase (PBKDF2-SHA-256, never under 600,000 rounds), AES-GCM-256 ---------- */
function kdf(secret,salt,iter){var s=S();return s.importKey("raw",TE.encode(String(secret).normalize("NFC")),"PBKDF2",false,["deriveKey"])
  .then(function(k){return s.deriveKey({name:"PBKDF2",hash:"SHA-256",salt:salt,iterations:iter},k,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);});}
function importDek(raw){return S().importKey("raw",raw,"AES-GCM",false,["encrypt","decrypt"]);}
function enc(key,iv,aad,bytes){return S().encrypt({name:"AES-GCM",iv:iv,additionalData:TE.encode(aad),tagLength:128},key,bytes).then(function(b){return new Uint8Array(b);});}
function dec(key,iv,aad,bytes){return S().decrypt({name:"AES-GCM",iv:iv,additionalData:TE.encode(aad),tagLength:128},key,bytes).then(function(b){return new Uint8Array(b);});}
/* the rounds are set once, to about three quarters of a second on this device, and never below 600,000 */
function calibrate(){var salt=rnd(16),t0=Date.now();return kdf("calibration",salt,600000).then(function(){var ms=Math.max(Date.now()-t0,40),it=Math.round(600000*750/ms/10000)*10000;return Math.max(600000,Math.min(2000000,it));});}
function normPhrase(s){return String(s||"").normalize("NFC").toLowerCase().replace(/[^a-z\s]/g," ").trim().split(/\s+/).filter(Boolean).join(" ");}

/* ---------- the keys, in this closure only; the lock record in localStorage "ingenium_lock" holds nothing that opens anything without the password ---------- */
var K={raw:null,key:null,js:null},OFF=false,READY=[],REC=null;
function okRec(o){return !!(o&&o.v===1&&o.dek&&o.kdf&&o.check);}
function readRec(){try{var r=localStorage.getItem(LSK);if(!r)return null;var o=JSON.parse(r);return okRec(o)?o:null;}catch(e){return null;}}
function writeRec(r){try{localStorage.setItem(LSK,JSON.stringify(r));REC=r;return true;}catch(e){warn(e);return false;}}
/* a change to the record starts from the newest one kept (another window may have changed the password since) */
function patchRec(fn){var cur=readRec();if(!cur||!REC||cur.made!==REC.made)cur=REC;if(!cur)return null;var r=JSON.parse(JSON.stringify(cur));fn(r);return writeRec(r)?r:null;}
/* the sealed desk carries its own lock record in its clear header (the record opens nothing without the password or the phrase),
   so a desk whose browser store was lost (the computer apps' web view at a new address, a store cleared by hand) still opens */
function headLock(raw){try{var h=raw?deskHead(raw):null,l=h&&h.lock;return okRec(l)?l:null;}catch(e){return null;}}
function pickRec(mine,its){if(!its)return mine;if(!mine)return its;if(mine.made!==its.made)return its;return (its.changed||0)>(mine.changed||0)?its:mine;}
function takeHeadLock(raw){var l=headLock(raw);if(!l)return;var p=pickRec(REC,l);if(p!==REC){REC=p;writeRec(p);}}
REC=readRec();takeHeadLock(W_.__ingLockedRaw);
function active(){return !!REC;}
function on(){return !!K.key&&!OFF;}
function canOpen(){return !!K.key;}
function ready(){if(K.key||!REC)return Promise.resolve();return new Promise(function(res){READY.push(res);});}
function holdKeys(r){K.raw=r.dekRaw;K.key=r.dek;K.js=jsGcm(r.dekRaw);var w=READY;READY=[];w.forEach(function(f){try{f();}catch(e){}});}
function dropKeys(){K.raw=null;K.key=null;K.js=null;}
function makeRecord(user,password,phrase){var dekRaw=rnd(32),salt=rnd(16),rsalt=rnd(16);
  return calibrate().then(function(iter){return Promise.all([kdf(password,salt,iter),kdf(normPhrase(phrase),rsalt,iter)]).then(function(ks){var iv1=rnd(12),iv2=rnd(12);
    return Promise.all([enc(ks[0],iv1,"ingenium-lock dek",dekRaw),enc(ks[1],iv2,"ingenium-lock recovery",dekRaw),importDek(dekRaw)]).then(function(r){var dek=r[2],iv3=rnd(12),iv4=rnd(12);
      return Promise.all([enc(dek,iv3,"ingenium-lock check",TE.encode(CHECK)),enc(dek,iv4,"ingenium-lock phrase",TE.encode(normPhrase(phrase)))]).then(function(c){
        return {rec:{v:1,user:String(user||"").slice(0,60),made:Date.now(),changed:Date.now(),idle:15,kdf:{name:"PBKDF2",hash:"SHA-256",iter:iter,salt:b64e(salt)},
          dek:{iv:b64e(iv1),ct:b64e(r[0])},rec:{iter:iter,salt:b64e(rsalt),iv:b64e(iv2),ct:b64e(r[1])},check:{iv:b64e(iv3),ct:b64e(c[0])},phr:{iv:b64e(iv4),ct:b64e(c[1])},mig:{big:0,rec:0}},dekRaw:dekRaw,dek:dek};});});});});}
/* the data key, from the password ("dek") or the recovery phrase ("rec"); a wrong one is refused before anything is read */
function openWith(rec,secret,which){if(!S())return Promise.reject(new Error("nosubtle"));if(!rec)return Promise.reject(new Error("no lock"));
  var w=which==="rec"?rec.rec:rec.dek,salt=b64d(which==="rec"?rec.rec.salt:rec.kdf.salt),iter=which==="rec"?rec.rec.iter:rec.kdf.iter;
  return kdf(secret,salt,iter).then(function(k){return dec(k,b64d(w.iv),which==="rec"?"ingenium-lock recovery":"ingenium-lock dek",b64d(w.ct));})
    .then(function(dekRaw){return importDek(dekRaw).then(function(dek){return dec(dek,b64d(rec.check.iv),"ingenium-lock check",b64d(rec.check.ct)).then(function(c){if(TD.decode(c)!==CHECK)throw new Error("check");return {dekRaw:dekRaw,dek:dek};});});});}
function rewrap(pw){var salt=rnd(16),iter=(REC&&REC.kdf&&REC.kdf.iter)||600000;return kdf(pw,salt,iter).then(function(k){var iv=rnd(12);return enc(k,iv,"ingenium-lock dek",K.raw).then(function(ct){
  if(!patchRec(function(r){r.kdf={name:"PBKDF2",hash:"SHA-256",iter:iter,salt:b64e(salt)};r.dek={iv:b64e(iv),ct:b64e(ct)};r.changed=Date.now();}))throw new Error("This browser's store refused the change.");
  /* the desk is written again at once, so its header carries the new password's lock too */
  try{W_.saveState();}catch(e){}});});}

/* ---------- envelopes: "ING1." (or "ING1g." when gzipped first) + the nonce + the ciphertext, each base64; the place the text belongs to is bound as additional data ---------- */
var ENV=/^ING1(g?)\.([A-Za-z0-9+\/=]+)\.([A-Za-z0-9+\/=]*)$/;
function sealed(s){return typeof s==="string"&&s.length>20&&s.charCodeAt(0)===73&&/^ING1g?\./.test(s);}
function sealText(text,aad){if(!K.key)return Promise.reject(new Error("the keys are not in hand"));var u8=TE.encode(String(text==null?"":text));
  var p=(GZ&&u8.length>GZ_MIN)?gz(u8).then(function(z){return {b:z,g:"g"};},function(){return {b:u8,g:""};}):Promise.resolve({b:u8,g:""});
  return p.then(function(x){var iv=rnd(12);return enc(K.key,iv,aad,x.b).then(function(ct){return "ING1"+x.g+"."+b64e(iv)+"."+b64e(ct);});});}
function openText(env,aad){if(!K.key)return Promise.reject(new Error("the keys are not in hand"));var m=ENV.exec(String(env||""));if(!m)return Promise.reject(new Error("not sealed"));
  return dec(K.key,b64d(m[2]),aad,b64d(m[3])).then(function(u8){return m[1]?gunz(u8).then(function(p){return TD.decode(p);}):TD.decode(u8);});}
function sealTextSync(text,aad){if(!K.js)throw new Error("the keys are not in hand");var iv=rnd(12);return "ING1."+b64e(iv)+"."+b64e(K.js.seal(iv,TE.encode(aad),TE.encode(String(text==null?"":text))));}

/* ---------- the desk's envelope: a small clear header (when it was saved, the look, how many chats and messages), so the tab's icon, the
   loading page, the desk's own stamp checks and the computer app's counts keep working, and the sealed desk as its body ---------- */
function isDeskEnv(s){return typeof s==="string"&&s.lastIndexOf('{"ing":"locked"',0)===0;}
function deskHead(s){try{var o=JSON.parse(s);return (o&&o.ing==="locked"&&typeof o.body==="string")?o:null;}catch(e){return null;}}
function deskHeader(raw,st){var h={ing:"locked",v:1,__deskAt:0,theme:"day",look:{theme:"day",motion:"calm",depth:"raised"},n:{chats:0,messages:0},lock:REC};
  try{if(st&&typeof st==="object"){h.__deskAt=st.__deskAt||0;h.theme=st.theme||"day";h.look={theme:h.theme,motion:st.motion||"calm",depth:st.depth||"raised"};var c=st.chats||[],n=0;for(var i=0;i<c.length;i++)n+=((c[i]&&c[i].messages)||[]).length;h.n={chats:c.length,messages:n};}
    else{var m=/"__deskAt":(\d+)/.exec(raw);h.__deskAt=m?+m[1]:0;m=/"theme":"(day|night|auto)"/.exec(raw);h.theme=m?m[1]:"day";var mo=/"motion":"(full|calm|minimal)"/.exec(raw),de=/"depth":"(\w+)"/.exec(raw);
      h.look={theme:h.theme,motion:mo?mo[1]:"calm",depth:de?de[1]:"raised"};h.n={chats:(raw.match(/"messages":/g)||[]).length,messages:(raw.match(/"role":"(?:me|bot)"/g)||[]).length};}}catch(e){}
  return h;}
function sealDesk(raw,st){return sealText(raw,"desk").then(function(body){var h=deskHeader(raw,st);h.body=body;return JSON.stringify(h);});}
function sealDeskSync(raw,st){var h=deskHeader(raw,st);h.body=sealTextSync(raw,"desk");return JSON.stringify(h);}
function openDesk(env){var h=deskHead(env);if(!h)return Promise.reject(new Error("not a sealed desk"));return openText(h.body,"desk");}

/* ---------- the desk's writer: saveState hands it the desk; one sealing at a time, the newest desk always the one written; what is still
   on its way when the window hides or closes is sealed at once in plain JavaScript, so the last change is never lost ---------- */
var W={pend:null,cur:null,busy:false,seq:0,committed:0,waiters:[]};
function deskWrite(raw){W.pend={raw:raw,seq:++W.seq,st:W_.state};kick();return W.seq;}
function afterWrite(seq){if(seq<=W.committed)return Promise.resolve();return new Promise(function(res){W.waiters.push({seq:seq,res:res});});}
function kick(){if(W.busy||!W.pend)return;var j=W.pend;W.pend=null;W.cur=j;W.busy=true;
  sealDesk(j.raw,j.st).then(function(env){commit(env,j.seq);},function(e){warn(e);}).then(function(){W.busy=false;if(W.cur===j)W.cur=null;kick();});}
function commit(env,seq){if(seq<=W.committed||OFF)return;W.committed=seq;var lsOk=true;
  if(W_.HAS_LS){try{localStorage.setItem(W_.KEY,env);W_.ingNoteSnapshot(env);}catch(e1){try{W_.SNAPRING.forEach(function(k){localStorage.removeItem(k);});localStorage.setItem(W_.KEY,env);}catch(e2){lsOk=false;try{W_.ingStoreFull();}catch(_){}}}}
  else{try{W_.memStore[W_.KEY]=env;}catch(e){}}
  try{if(W_.__deskOverflow)W_.__deskOverflow(env,W_.HAS_LS&&lsOk);}catch(e){}
  shellSave(env);
  if(W.waiters.length)W.waiters=W.waiters.filter(function(w){if(w.seq<=seq){try{w.res();}catch(e){}return false;}return true;});}
function flushSync(){var j=W.pend||W.cur;if(j&&j.seq>W.committed&&K.js&&!OFF){W.pend=null;try{commit(sealDeskSync(j.raw,j.st),j.seq);}catch(e){warn(e);}}shellFlush();}
/* the computer apps' copy on disk, half a second after the hands stop, as the base does; never before the desk on disk was looked at (R96) */
var SH={timer:null,env:null};
function api0(){try{return typeof W_.shellApi==="function"?W_.shellApi():null;}catch(e){return null;}}
function shellSave(env){var api=api0();if(!api||typeof api.save_state!=="function")return;if(!W_.DESK_CHECKED){W_.DESK_PENDING=true;return;}
  SH.env=env;if(SH.timer)clearTimeout(SH.timer);SH.timer=setTimeout(function(){SH.timer=null;var e=SH.env;SH.env=null;try{var a=api0();if(a&&e)a.save_state(e);}catch(x){}},500);}
function shellFlush(){if(!SH.timer)return;clearTimeout(SH.timer);SH.timer=null;var e=SH.env;SH.env=null;try{var a=api0();if(a&&e&&typeof a.save_state==="function")a.save_state(e);}catch(x){}}
/* the shell's bridge itself seals what reaches the disk and opens what comes back from it, so every path that writes desk.json or a big/*.txt
   (the base, the Backup page's restore, Fabrica's mirror, the signing keys' copies) is covered at once; an envelope passes through unchanged */
function wrapShell(){var a=api0();if(!a||a.__r197)return;try{a.__r197=1;}catch(e){return;}
  var s0=a.save_state,p0=a.big_put,g0=a.big_get;a.__r197raw={save_state:s0,big_put:p0,big_get:g0};
  if(typeof s0==="function")a.save_state=function(raw){raw=String(raw==null?"":raw);
    if(on()&&raw.charAt(0)==="{"&&!isDeskEnv(raw)){if(D.hidden){try{return s0.call(a,sealDeskSync(raw,null));}catch(e){return Promise.reject(e);}}return sealDesk(raw,null).then(function(env){return s0.call(a,env);});}
    return s0.call(a,raw);};
  if(typeof p0==="function")a.big_put=function(id,text){text=String(text==null?"":text);
    if(on()&&!sealed(text)){if(D.hidden){try{return p0.call(a,id,sealTextSync(text,"big:"+id));}catch(e){return Promise.reject(e);}}return sealText(text,"big:"+id).then(function(v){return p0.call(a,id,v);});}
    return p0.call(a,id,text);};
  if(typeof g0==="function")a.big_get=function(id){return Promise.resolve(g0.call(a,id)).then(function(r){if(r&&r.ok&&typeof r.text==="string"&&sealed(r.text)&&active())
      return ready().then(function(){return openText(r.text,"big:"+id);}).then(function(t){var o={};for(var k in r)o[k]=r[k];o.text=t;return o;});return r;});};}
function rawShell(){var a=api0();return a?(a.__r197raw||{save_state:a.save_state,big_put:a.big_put,big_get:a.big_get}):null;}

/* ---------- the Backup page: a backup stays a plain zip, so the records it reads are opened; what it puts back is sealed (r143 asks) ---------- */
function bigLike(db,sn){return db==="ingenium_big"&&sn==="t";}
function recLike(db,sn){return RSTORES.some(function(x){return x[0]===db&&x[1]===sn;});}
function openRecs(db,sn,recs){if(!canOpen()||!recs)return Promise.resolve();
  if(recLike(db,sn))return seq(recs,function(r){if(r&&isRecEnv(r.v))return openRec(db,sn,r.v).then(function(p){if(p!=null)r.v=p;});});
  if(!bigLike(db,sn))return Promise.resolve();
  return seq(recs,function(r){if(r&&typeof r.v==="string"&&sealed(r.v))return openText(r.v,"big:"+r.k).then(function(t){r.v=t;},function(){});});}
function sealRecs(db,sn,recs){if(!on()||!recs)return Promise.resolve(recs);var out=[];
  if(recLike(db,sn))return seq(recs,function(r){if(r&&r.v!=null&&!isRecEnv(r.v))return sealRec(db,sn,r.k,r.v).then(function(w){out.push({k:r.k,v:w});},function(){out.push(r);});out.push(r);}).then(function(){return out;});
  if(!bigLike(db,sn))return Promise.resolve(recs);
  return seq(recs,function(r){if(r&&typeof r.v==="string"&&!sealed(r.v)&&typeof r.k==="string")return sealText(r.v,"big:"+r.k).then(function(v){out.push({k:r.k,v:v});},function(){out.push(r);});out.push(r);}).then(function(){return out;});}
/* the Backup page reads the signing keys' records straight from their store: opened here, so the keys in a backup are the keys themselves */
function openValues(db,sn,arr){arr=arr||[];if(!canOpen())return Promise.resolve(arr);var out=[];return seq(arr,function(v){return openRec(db,sn,v).then(function(p){if(p!=null)out.push(p);});}).then(function(){return out;});}

/* ---------- the other stores of the larger store: what was brought in from elsewhere ("ingenium_claude"), the signing keys ("ingenium_keys")
   and Fabrica's issues and pages ("ingenium_hub"). With the lock on a record there is kept as {ing:"sealed",v:1,k:<its key>,id:<its key>,env:"ING1…"}
   (its place bound as additional data); the part that owns the store seals what it writes and opens what it reads (r131, r136, r141), a plain
   record and a sealed one are both read, and the walkers below seal what is already there (or open it again) one record at a time ---------- */
function packRec(v){return JSON.stringify(v,function(k,x){if(x instanceof Uint8Array)return {"$u8":b64e(x)};if(x instanceof ArrayBuffer)return {"$u8":b64e(new Uint8Array(x))};return x;});}
function unpackRec(t){return JSON.parse(t,function(k,x){if(x&&typeof x==="object"&&!Array.isArray(x)&&typeof x.$u8==="string"&&Object.keys(x).length===1)return b64d(x.$u8);return x;});}
function recAad(db,sn,k){return "rec:"+db+"/"+sn+"/"+String(k);}
function isRecEnv(v){return !!(v&&typeof v==="object"&&!Array.isArray(v)&&v.ing==="sealed"&&typeof v.env==="string");}
function sealRec(db,sn,k,v){if(!on()||v==null||isRecEnv(v))return Promise.resolve(v);
  return sealText(packRec(v),recAad(db,sn,k)).then(function(env){return {ing:"sealed",v:1,k:k,id:k,env:env};});}
/* a plain record passes through; a sealed one is opened (once the keys are in hand) and read as it was; one that cannot be opened is null, as a missing one is */
function openRec(db,sn,v){if(!isRecEnv(v))return Promise.resolve(v);
  return ready().then(function(){return openText(v.env,recAad(db,sn,v.k));}).then(unpackRec).catch(function(e){warn(e);return null;});}
var RSTORES=[["ingenium_claude","conv"],["ingenium_claude","meta"],["ingenium_keys","k"],["ingenium_hub","apps"]];
function existingDb(name){return new Promise(function(res){if(!W_.indexedDB){res(null);return;}var made=false,rq;try{rq=indexedDB.open(name);}catch(e){res(null);return;}
  rq.onupgradeneeded=function(ev){if(ev.oldVersion===0){made=true;try{rq.transaction.abort();}catch(e){}}};
  rq.onsuccess=function(){var d=rq.result;if(made){try{d.close();}catch(e){}res(null);return;}d.onversionchange=function(){try{d.close();}catch(e){}};res(d);};
  rq.onerror=function(ev){try{ev.preventDefault();}catch(e){}res(null);};rq.onblocked=function(){res(null);};});}
function rtx(d,sn,mode,fn){return new Promise(function(res,rej){try{var t=d.transaction(sn,mode),r=fn(t.objectStore(sn));t.oncomplete=function(){res(r&&"result" in r?r.result:undefined);};t.onerror=t.onabort=function(){rej(t.error||new Error("this device's store refused it"));};}catch(e){rej(e);}});}
/* a record is replaced only if the store still holds the very one that was read (the owning part may have written a newer one meanwhile) */
function swapRec(d,sn,k,from,to){var hit=false,fp=packRec(from);
  return rtx(d,sn,"readwrite",function(s){var g=s.get(k);g.onsuccess=function(){if(g.result!==undefined&&packRec(g.result)===fp){if(s.keyPath!==null&&s.keyPath!==undefined)s.put(to);else s.put(to,k);hit=true;}};return g;}).then(function(){return hit;});}
function oneRec(d,db,sn,k,dir){return rtx(d,sn,"readonly",function(s){return s.get(k);}).then(function(v){if(v==null)return false;
  if(dir==="seal"){if(isRecEnv(v))return false;return sealRec(db,sn,k,v).then(function(w){return w===v?false:swapRec(d,sn,k,v,w);});}
  if(!isRecEnv(v))return false;return openRec(db,sn,v).then(function(p){return p==null?false:swapRec(d,sn,k,v,p);});});}
/* the signing keys' copies on the computer apps' disk (signing_<id>), by the shell's own bridge (the part that wrote them wrote plain text before the lock) */
function diskSigning(dir){var sh=rawShell(),api=api0();if(!sh||!api||typeof sh.big_get!=="function"||typeof sh.big_put!=="function")return Promise.resolve(0);
  return existingDb("ingenium_keys").then(function(d){if(!d)return 0;if(!d.objectStoreNames.contains("k")){d.close();return 0;}
    return rtx(d,"k","readonly",function(s){return s.getAllKeys();}).then(function(keys){try{d.close();}catch(e){}var n=0;
      return seq((keys||[]).filter(function(k){return typeof k==="string";}),function(k){var id="signing_"+k;
        return Promise.resolve().then(function(){return sh.big_get.call(api,id);}).then(function(r){if(!(r&&r.ok&&typeof r.text==="string"))return;
          if(dir==="seal"){if(sealed(r.text))return;return sealText(r.text,"big:"+id).then(function(env){return sh.big_put.call(api,id,env);}).then(function(){n++;});}
          if(!sealed(r.text))return;return openText(r.text,"big:"+id).then(function(t){return sh.big_put.call(api,id,t);}).then(function(){n++;},function(){});},function(){});}).then(function(){return n;});},
      function(e){try{d.close();}catch(_){}throw e;});});}
function walkRecs(dir,say){var counts=[],total=0,n=0,done=0;
  return seq(RSTORES,function(ds,i){return existingDb(ds[0]).then(function(d){if(!d){counts[i]=0;return;}
      if(!d.objectStoreNames.contains(ds[1])){d.close();counts[i]=0;return;}
      return rtx(d,ds[1],"readonly",function(s){return s.count();}).then(function(c){counts[i]=c||0;total+=counts[i];try{d.close();}catch(e){}},function(){counts[i]=0;try{d.close();}catch(e){}});});})
    .then(function(){return seq(RSTORES,function(ds,i){if(!counts[i])return;
      return existingDb(ds[0]).then(function(d){if(!d)return;
        return rtx(d,ds[1],"readonly",function(s){return s.getAllKeys();}).then(function(keys){
          return seq(keys||[],function(k){n++;if(say){try{say(n,total);}catch(e){}}return oneRec(d,ds[0],ds[1],k,dir).then(function(hit){if(hit)done++;});});})
          .then(function(){try{d.close();}catch(e){}},function(e){try{d.close();}catch(_){}throw e;});});});})
    .then(function(){return diskSigning(dir).then(function(m){return done+m;});});}

/* ---------- the long texts already on the device, sealed in place (or opened again), one at a time, so a stop midway leaves nothing lost:
   every reader takes a plain record and a sealed one alike, and an unfinished sealing goes on at the next sign-in ---------- */
function bigDb(){return new Promise(function(res,rej){try{var rq=indexedDB.open("ingenium_big",1);rq.onupgradeneeded=function(){try{rq.result.createObjectStore("t");}catch(e){}};
  rq.onsuccess=function(){res(rq.result);};rq.onerror=function(){rej(rq.error);};rq.onblocked=function(){rej(new Error("blocked"));};}catch(e){rej(e);}});}
function bigReq(d,mode,fn){return new Promise(function(res,rej){try{var t=d.transaction("t",mode),r=fn(t.objectStore("t"));t.oncomplete=function(){res(r?r.result:undefined);};t.onerror=t.onabort=function(){rej(t.error);};}catch(e){rej(e);}});}
function walkBig(dir,say){if(!W_.indexedDB)return Promise.resolve(0);var sh=rawShell(),disk=!!(sh&&typeof sh.big_put==="function"&&typeof sh.big_get==="function"),api=api0(),done=0;
  return bigDb().then(function(d){return bigReq(d,"readonly",function(s){return s.getAllKeys();}).then(function(keys){keys=(keys||[]).filter(function(k){return typeof k==="string";});
      var extra=[];if(disk){try{var live=W_.ingBigLive();Object.keys(live).forEach(function(id){if(keys.indexOf(id)<0)extra.push(id);});}catch(e){}}
      var N=keys.length+extra.length,n=0;
      function diskPut(k,v){if(!disk||v.length>16*1024*1024)return Promise.resolve();return Promise.resolve().then(function(){return sh.big_put.call(api,k,v);}).catch(function(){});}
      function one(k,onDisk){n++;if(say){try{say(n,N);}catch(e){}}
        var get=onDisk?Promise.resolve().then(function(){return sh.big_get.call(api,k);}).then(function(r){return (r&&r.ok&&typeof r.text==="string")?r.text:null;},function(){return null;}):bigReq(d,"readonly",function(s){return s.get(k);});
        /* a text is replaced only if the store still holds the very one that was read: a newer one put meanwhile (sealed, by the store itself) stays */
        function swap(from,to){if(onDisk)return Promise.resolve(true);var hit=false;return bigReq(d,"readwrite",function(s){var g=s.get(k);g.onsuccess=function(){if(g.result===from){s.put(to,k);hit=true;}};return g;}).then(function(){return hit;});}
        return get.then(function(v){if(typeof v!=="string")return;
          if(dir==="seal"){if(sealed(v))return;return sealText(v,"big:"+k).then(function(env){return swap(v,env).then(function(hit){if(!hit)return;done++;return diskPut(k,env);});});}
          if(!sealed(v))return;return openText(v,"big:"+k).then(function(t){return swap(v,t).then(function(hit){if(!hit)return;done++;return diskPut(k,t);});},function(){});});}
      return seq(keys,function(k){return one(k,false);}).then(function(){return seq(extra,function(k){return one(k,true);});});})
    .then(function(){try{d.close();}catch(e){}return done;},function(e){try{d.close();}catch(_){}throw e;});});}
/* older copies of the desk (kept by earlier versions under other names, or set aside when one could not be read) are desk copies too:
   sealed in place, and opened again when protection is turned off */
function legacyKeys(){var out=[];try{var old=(W_.OLDKEYS||[]);for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&(old.indexOf(k)>=0||/^ingenium_v4\.broken-\d+$/.test(k)))out.push(k);}}catch(e){}return out;}
function walkLegacy(dir){var n=0;return seq(legacyKeys(),function(k){var v=null;try{v=localStorage.getItem(k);}catch(e){}if(typeof v!=="string"||!v)return;
  if(dir==="seal"){if(isDeskEnv(v))return;return sealDesk(v,null).then(function(env){try{if(localStorage.getItem(k)===v){localStorage.setItem(k,env);n++;}}catch(e){}});}
  if(!isDeskEnv(v))return;return openDesk(v).then(function(t){try{localStorage.setItem(k,t);n++;}catch(e){}},function(){});}).then(function(){return n;});}
function migrate(sayBig,sayRec){var m=(REC&&REC.mig)||{},n0=0;
  return (m.big===1?Promise.resolve(0):walkBig("seal",sayBig).then(function(n){if(REC)patchRec(function(r){r.mig=r.mig||{};r.mig.big=1;});return n;}))
    .then(function(n){n0=n;return m.rec===1?0:walkRecs("seal",sayRec).then(function(k){if(REC)patchRec(function(r){r.mig=r.mig||{};r.mig.rec=1;});return k;});})
    .then(function(k){n0+=k;return walkLegacy("seal");})
    .then(function(k){return n0+k;});}
function migrating(){return !!(REC&&REC.mig&&(REC.mig.big!==1||REC.mig.rec!==1));}

/* ---------- the long-text store's sweep (R81, 90 s after the start) lets go of what the desk does not name. While the desk is still
   sealed the page holds only the empty desk it started from, which names nothing: the sweep then waits for the sign-in (a sweep
   then would let go of every long text here, and on the computer apps of their copies on disk). With the lock on, what the sealed
   recovery shelf names is kept as well, as the plain shelf's names are (R142). ---------- */
var GC={skipped:false,wrapped:false};
function waiting(){return !!(W_.__ingLocked||(REC&&!K.key));}
function shelfIds(){var raws=[],out=[];try{(W_.SNAPRING||[]).forEach(function(k){var r=localStorage.getItem(k);if(!r)return;var p=JSON.parse(r);if(p&&isDeskEnv(p.v))raws.push(p.v);});}catch(e){}
  return seq(raws,function(r){return openDesk(r).then(function(t){var re=/"(big_[a-z0-9]{7,})"/g,m;while((m=re.exec(t)))out.push(m[1]);},function(){});}).then(function(){return out;});}
function wrapGc(){var B=W_.IngBig;if(GC.wrapped||!B||typeof B.gc!=="function")return;GC.wrapped=true;var og=B.gc;
  B.gc=function(live){var self=this;if(waiting()){GC.skipped=true;return Promise.resolve();}
    if(!on())return og.apply(self,arguments);live=live||{};
    return shelfIds().then(function(ids){ids.forEach(function(id){live[id]=1;});return og.call(self,live);},function(){return og.call(self,live);});};
  /* what the sweep before this one carried (the storage page's mark that it is wired) stays on it */
  try{Object.keys(og).forEach(function(k){if(!(k in B.gc))B.gc[k]=og[k];});B.gc.__r197=1;}catch(e){}}
/* the sweep that waited runs a minute and a half after the sign-in, against the desk now open */
function gcLater(){setTimeout(function(){if(!GC.skipped||waiting())return;GC.skipped=false;try{W_.IngBig.gc(W_.ingBigLive());}catch(e){warn(e);}},90000);}

/* ---------- the door: one raised card over everything (opaque over the loading page at boot; translucent over the open page) ---------- */
var CANT="A sign-in with a password works only where the browser offers its cryptography: in the Ingenium apps, or a page opened at localhost or over https. At this address it cannot be turned on, and a sealed desk cannot be opened.";
var DOOR=null,CARD=null;
function night(){try{var h=W_.__ingLockedRaw?deskHead(W_.__ingLockedRaw):null,t=h?h.theme:null;
  if(!t)return D.body.getAttribute("data-theme")==="night";if(t==="night")return true;if(t==="auto")return !!(W_.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches);return false;}catch(e){return false;}}
function door(over){if(!DOOR){DOOR=D.createElement("div");DOOR.id="ingLockDoor";DOOR.setAttribute("role","dialog");DOOR.setAttribute("aria-modal","true");DOOR.setAttribute("aria-label","Ingenium's sign-in");
    CARD=D.createElement("div");CARD.className="ild-card";DOOR.appendChild(CARD);(D.body||D.documentElement).appendChild(DOOR);}
  DOOR.classList.toggle("ild-night",night());DOOR.classList.toggle("ild-over",!!over);DOOR.hidden=false;return CARD;}
function view(html,over){var c=door(over);c.innerHTML=html;c.scrollTop=0;setTimeout(function(){var ins=[].slice.call(c.querySelectorAll("input:not([type=hidden])")),f=null;
    for(var i=0;i<ins.length;i++)if(!ins[i].value){f=ins[i];break;}f=f||ins[0]||c.querySelector("button.ild-key");if(f){try{f.focus();}catch(e){}}},40);return c;}
function closeDoor(){if(DOOR){DOOR.hidden=true;CARD.innerHTML="";}}
function doorOpen(){return !!(DOOR&&!DOOR.hidden);}
/* while the door is open the keyboard stays inside it (Tab goes round its keys), and Escape closes a question asked over the open page */
D.addEventListener("keydown",function(e){if(!doorOpen())return;
  if(e.key==="Escape"&&DOOR.classList.contains("ild-over")){var cx=CARD.querySelector("#ildCancel,#ildClose,#ildDone");if(cx&&!cx.disabled){e.preventDefault();e.stopPropagation();cx.click();}return;}
  if(e.key!=="Tab")return;var f=[].slice.call(CARD.querySelectorAll("input:not([type=hidden]),button,select,a[href]")).filter(function(x){return !x.disabled&&x.offsetParent!==null;});if(!f.length)return;
  var a=D.activeElement,first=f[0],last=f[f.length-1];
  if(!CARD.contains(a)){e.preventDefault();first.focus();}else if(e.shiftKey&&a===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&a===last){e.preventDefault();first.focus();}},true);
function err(c,msg){var e=c.querySelector(".ild-err");if(!e){e=D.createElement("p");e.className="ild-err";e.setAttribute("role","alert");var f=c.querySelector("form")||c,at=null;
  for(var i=0;i<f.children.length;i++){var ch=f.children[i];if(/(^|\s)(ild-words|ild-keys|ild-pair)(\s|$)/.test(ch.className||"")||ch.tagName==="LABEL"||ch.querySelector("label")){at=ch;break;}}f.insertBefore(e,at);}e.textContent=msg||"";e.hidden=!msg;}
function busyKeys(c,on_){[].forEach.call(c.querySelectorAll(".ild-key"),function(b){b.disabled=!!on_;});}
function toast(t){try{W_.ingToast(t);}catch(e){}}
function idleWords(m){return m===5?"five minutes":m===60?"an hour":m===0?"never":"a quarter of an hour";}
function pwFields(l1,l2){return '<label><span>'+l1+'</span><input type="password" id="ildP1" autocomplete="new-password"></label><label><span>'+l2+'</span><input type="password" id="ildP2" autocomplete="new-password"></label>';}
function pwCheck(c){var a=c.querySelector("#ildP1").value,b=c.querySelector("#ildP2").value;if(a.length<MIN_PW){err(c,"Choose a password of at least eight characters.");return null;}if(a!==b){err(c,"The two passwords are not the same.");return null;}return a;}
function wordsHtml(w){return '<div class="ild-words" aria-label="Your recovery phrase">'+w.map(function(x,i){return '<div><b>'+(i+1)+'</b>'+esc(x)+'</div>';}).join("")+'</div>';}
/* ten different words out of 512 (nine bits each, no bias: 65,536 is a multiple of 512), so no word is written down twice */
function makePhrase(){var w=[],seen={};while(w.length<N_WORDS){var u=new Uint16Array(8);(W_.crypto||W_.msCrypto).getRandomValues(u);for(var i=0;i<u.length&&w.length<N_WORDS;i++){var x=WORDS[u[i]&511];if(!seen[x]){seen[x]=1;w.push(x);}}}return w;}

/* ---------- the sign-in ---------- */
/* the user name is the one kept with the lock, filled in already (a sign-in names who signs in); it is not a secret, so it is told
   apart in plain words, but only the password opens anything */
function sameName(a,b){function n(x){return String(x||"").normalize("NFC").trim().replace(/\s+/g," ").toLowerCase();}return n(a)===n(b);}
function signIn(msg){var name=REC&&REC.user?REC.user:"";
  var c=view('<h1>Ingenium</h1><p class="ild-sub">'+(name?'Welcome back, '+esc(name)+'.':'Welcome back.')+'</p>'
    +'<form id="ildSign" autocomplete="on"><label><span>Your user name</span><input type="text" id="ildName" autocomplete="username" autocapitalize="off" spellcheck="false" value="'+esc(name)+'"></label>'
    +'<label><span>Your password</span><input type="password" id="ildPw" autocomplete="current-password" autocapitalize="off"></label>'
    +'<div class="ild-keys"><button type="button" class="ild-link" id="ildForgot">Forgot your password?</button><button type="submit" class="ild-key" id="ildGo">Sign in</button></div></form>'
    +'<p class="ild-note">Your data on this device is sealed with your password. Nothing in it opens without it.</p>',false);
  if(msg)err(c,msg);
  c.querySelector("#ildForgot").onclick=function(){forgot();};
  c.querySelector("#ildSign").onsubmit=function(e){e.preventDefault();var pw=c.querySelector("#ildPw").value,nm=c.querySelector("#ildName").value;
    if(name&&!sameName(nm,name)){err(c,"That user name and password do not open this copy. Nothing was changed.");var q=c.querySelector("#ildName");if(q){try{q.focus();q.select();}catch(_){}}return;}
    if(!pw){err(c,"Type your password.");return;}
    err(c,"");busyKeys(c,true);unlock(pw).then(null,function(x){busyKeys(c,false);var m=x&&x.message;
      err(c,m==="nosubtle"?CANT:(m==="desk"?"The password is right, but the sealed desk could not be opened; it may have been changed by hand. Nothing was changed.":"That password does not open this copy. Nothing was changed."));
      var i=c.querySelector("#ildPw");if(i){i.value="";try{i.focus();}catch(_){}}});};}
function forgot(){var c=view('<h2>Forgot your password?</h2><p>Type the ten words of your recovery phrase, in their order, with spaces between them. Capital letters do not matter.</p>'
    +'<form id="ildFg" autocomplete="off"><label><span>Your recovery phrase</span><input type="text" id="ildPhrase" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ten words"></label>'
    +'<div class="ild-keys"><button type="button" class="ild-link" id="ildBack">Back to the sign-in</button><button type="submit" class="ild-key">Open with the phrase</button></div></form>'
    +'<p class="ild-note"><button type="button" class="ild-link" id="ildNeither">I have neither the password nor the phrase</button></p>',false);
  c.querySelector("#ildBack").onclick=function(){signIn();};
  c.querySelector("#ildNeither").onclick=function(){neither();};
  c.querySelector("#ildFg").onsubmit=function(e){e.preventDefault();var ph=normPhrase(c.querySelector("#ildPhrase").value);if(ph.split(" ").length<N_WORDS){err(c,"That is not the whole phrase: it has ten words.");return;}
    busyKeys(c,true);err(c,"");openWith(REC,ph,"rec").then(function(r){holdKeys(r);return takeDesk().then(function(){newPassword(function(){afterUnlock();toast("Opened with your recovery phrase. The new password is kept.");});});},
      function(x){busyKeys(c,false);dropKeys();err(c,x&&x.message==="desk"?"The phrase is right, but the sealed desk could not be opened; it may have been changed by hand.":"Those words do not open this copy. Check each word and their order; nothing was changed.");});};}
function neither(){var c=view('<h2>Start again with an empty desk?</h2><p>Without the password or the recovery phrase, what is sealed on this device cannot be opened: not by you, and not by anyone else. Ingenium can start again here with an empty desk and no sign-in.</p>'
    +'<p>The sealed desk is kept aside on this device, unopened. It cannot be read without the password or the phrase.</p>'
    +'<div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildBack">Back</button><button type="button" class="ild-key ild-danger" id="ildFresh">Start again with an empty desk</button></div>',false);
  c.querySelector("#ildBack").onclick=function(){forgot();};
  c.querySelector("#ildFresh").onclick=function(){busyKeys(c,true);startOver();};}
function newPassword(done){var c=view('<h2>Choose a new password</h2><p>Your phrase opened this copy. Choose the password you will sign in with from now on; the phrase stays as it is.</p>'
    +'<form id="ildNp">'+pwFields("A new password (at least eight characters)","The same password again")+'<div class="ild-keys"><button type="submit" class="ild-key">Keep this password</button></div></form>',false);
  c.querySelector("#ildNp").onsubmit=function(e){e.preventDefault();var pw=pwCheck(c);if(!pw)return;busyKeys(c,true);rewrap(pw).then(function(){done();},function(x){busyKeys(c,false);err(c,x&&x.message||"The password could not be kept.");});};}
/* the sealed desk to open: the one found at boot, unless the larger store (R132) holds a newer one */
function newest(){var raw=W_.__ingLockedRaw||null,p=Promise.resolve(null);
  try{if(W_.__r132&&typeof W_.__r132.get==="function")p=Promise.resolve(W_.__r132.get()).catch(function(){return null;});}catch(e){}
  return p.then(function(rec){try{if(rec&&rec.lsOk===false&&typeof rec.raw==="string"&&isDeskEnv(rec.raw)){var a=deskHead(rec.raw),b=raw?deskHead(raw):null;if(a&&(!b||(a.__deskAt||0)>(b.__deskAt||0)))raw=rec.raw;}}catch(e){}return raw;});}
function takeDesk(){return newest().then(function(raw){if(!raw)return;
  if(!isDeskEnv(raw)){try{adoptPlain(raw);}catch(e){warn(e);dropKeys();throw new Error("desk");}return;}
  return openDesk(raw).then(function(plain){adoptPlain(plain);},function(e){warn(e);dropKeys();throw new Error("desk");});});}
/* adopted as R132 and deskAdopt adopt: the desk's keys replaced in place, then the whole desk painted again */
function adoptPlain(plain){var incoming=JSON.parse(plain),migrated=W_.migrateFrom(incoming),st=W_.state;
  Object.keys(st).forEach(function(k){delete st[k];});Object.keys(migrated).forEach(function(k){st[k]=migrated[k];});
  try{if(W_.HAS_LS&&localStorage.getItem("ingenium_intro_seen")==="1")st.introSeen=true;}catch(e){}
  W_.__ingLocked=false;W_.__ingLockedRaw=null;
  try{W_.repaintDesk();}catch(e){warn(e);try{W_.saveState();}catch(_){}}}
function unlock(pw){return openWith(REC,pw,"dek").then(function(r){holdKeys(r);return takeDesk().then(function(){afterUnlock();});});}
function afterUnlock(){W_.__ingLocked=false;W_.__ingLockedRaw=null;closeDoor();try{if(W_.__ingBoot)W_.__ingBoot.done();}catch(e){}
  try{var st=W_.state,ci=$("chatInput");if(st&&st.__lockDraft){if(ci&&!ci.value){ci.value=st.__lockDraft;try{ci.dispatchEvent(new Event("input",{bubbles:true}));}catch(e){}}delete st.__lockDraft;W_.saveState();}}catch(e){warn(e);}
  wrapShell();paintCard();startIdle();ACT=Date.now();gcLater();
  if(migrating())setTimeout(function(){migrate(null,null).then(function(n){if(n)toast("What was left on this device is now sealed too.");paintCard();},warn);},1500);}
/* a sealed desk arrives after boot (from the larger store, or the computer app's disk) */
function adoptRaw(raw){if(!isDeskEnv(raw))return false;
  if(canOpen()){openDesk(raw).then(function(plain){adoptPlain(plain);toast("Your newest desk came back from this device's larger store.");},warn);return true;}
  takeHeadLock(raw);W_.__ingLockedRaw=raw;W_.__ingLocked=true;
  if(REC&&S()&&!doorOpen()){try{if(W_.__ingBoot)W_.__ingBoot.again("Sign in to open your desk.");}catch(e){}signIn();}
  return true;}

/* ---------- turning protection on: the name and the password, the phrase shown once and two of its words typed back, then everything here sealed ---------- */
function setup(opts){opts=opts||{};
  if(!S()){var c0=view('<h2>Protect this copy with a sign-in</h2><p>'+CANT+'</p><div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildClose">Close</button></div>',true);c0.querySelector("#ildClose").onclick=function(){closeDoor();if(opts.onCancel)opts.onCancel();};return;}
  if(REC){closeDoor();return;}
  var pre="";try{pre=(W_.state&&W_.state.persona&&W_.state.persona.name)||"";}catch(e){}
  var c=view('<h2>Protect this copy with a sign-in</h2><p>From then on Ingenium opens to a sign-in, and everything it keeps on this device is sealed with your password. Choose one you will remember: there is no way to reset it, only the recovery phrase shown next.</p>'
    +'<form id="ildSet" autocomplete="off"><label><span>Your user name (the sign-in asks for it, with the password)</span><input type="text" id="ildUser" maxlength="60" autocomplete="username" value="'+esc(pre)+'"></label>'+pwFields("A password (at least eight characters)","The same password again")
    +'<div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildCancel">Not now</button><button type="submit" class="ild-key">Next</button></div></form>',true);
  c.querySelector("#ildCancel").onclick=function(){closeDoor();if(opts.onCancel)opts.onCancel();};
  c.querySelector("#ildSet").onsubmit=function(e){e.preventDefault();var user=c.querySelector("#ildUser").value.trim(),pw=pwCheck(c);if(!pw)return;if(!user){err(c,"Type the user name you will sign in with.");return;}showPhrase(user,pw,opts,null);};}
function showPhrase(user,pw,opts,w){w=w||makePhrase();
  var c=view('<h2>Your recovery phrase</h2><p>Write these ten words down, in this order, and keep them somewhere safe, away from this device. If you ever forget your password, they are the only way back in. Without the password and without these words, no one can open this copy: not you, and not anyone else.</p>'
    +wordsHtml(w)+'<div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildBack">Back</button><button type="button" class="ild-key" id="ildWrote">I have written them down</button></div>',true);
  c.querySelector("#ildBack").onclick=function(){setup(opts);};
  c.querySelector("#ildWrote").onclick=function(){confirmPhrase(user,pw,w,opts);};}
function confirmPhrase(user,pw,w,opts){var i1=Math.floor(Math.random()*N_WORDS),i2=(i1+1+Math.floor(Math.random()*(N_WORDS-1)))%N_WORDS;if(i2<i1){var t=i1;i1=i2;i2=t;}
  var c=view('<h2>Two of the words, to be sure</h2><p>From what you wrote down, type word '+(i1+1)+' and word '+(i2+1)+' of your phrase.</p>'
    +'<form id="ildCf" autocomplete="off"><div class="ild-pair"><label><span>Word '+(i1+1)+'</span><input type="text" id="ildW1" autocomplete="off" autocapitalize="off" spellcheck="false"></label><label><span>Word '+(i2+1)+'</span><input type="text" id="ildW2" autocomplete="off" autocapitalize="off" spellcheck="false"></label></div>'
    +'<div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildAgain">Show the phrase again</button><button type="submit" class="ild-key">Turn protection on</button></div></form>',true);
  c.querySelector("#ildAgain").onclick=function(){showPhrase(user,pw,opts,w);};
  c.querySelector("#ildCf").onsubmit=function(e){e.preventDefault();var a=c.querySelector("#ildW1").value.trim().toLowerCase(),b=c.querySelector("#ildW2").value.trim().toLowerCase();
    if(a!==w[i1]||b!==w[i2]){err(c,"One of the words is not the one in the phrase. Check what you wrote down.");return;}enable(user,pw,w.join(" "),opts);};}
function progressView(title){return view('<h2>'+title+'</h2><p id="ildProgSay" role="status">Making your keys…</p><div class="ild-bar" aria-hidden="true"><i id="ildProgBar"></i></div>',true);}
function prog(c,text,frac){var s=c.querySelector("#ildProgSay"),b=c.querySelector("#ildProgBar");if(s)s.textContent=text;if(b&&frac!=null)b.style.width=Math.max(2,Math.min(100,Math.round(frac*100)))+"%";}
function enable(user,pw,phrase,opts){var c=progressView("Turning protection on"),written=false;
  return makeRecord(user,pw,phrase).then(function(r){if(!writeRec(r.rec))throw new Error("This browser's store refused the lock record, so protection was not turned on. Nothing was changed.");written=true;holdKeys(r);wrapShell();
      prog(c,"Sealing your desk…",0.15);var seq=0;try{W_.saveState();seq=W.seq;}catch(e){}return afterWrite(seq);})
    .then(function(){try{shellFlush();}catch(e){}return migrate(function(n,N){prog(c,"Sealing the long texts on this device: "+n+" of "+N+"…",0.2+0.55*(N?n/N:1));},
        function(n,N){prog(c,"Sealing what you brought in from elsewhere, the signing keys and Fabrica\'s pages: "+n+" of "+N+"…",0.75+0.2*(N?n/N:1));});})
    .then(function(){prog(c,"Done.",1);try{W_.SNAPRING.forEach(function(k){localStorage.removeItem(k);});W_._snapAt=0;}catch(e){}startIdle();
      var c2=view('<h2>Protected</h2><p>'+esc(user)+', this copy now opens to a sign-in, and your data on this device is sealed with your password. It locks on its own after '+idleWords(REC.idle)+' away; change that, the password, or see the phrase again in Settings, Your data.</p>'
        +'<p>Not sealed: backups you make from the Backup page (plain zips, as before), the documents the carried apps keep in their own frames, your model files, the app library and Fabrica\'s saved versions of your apps.</p>'
        +'<div class="ild-keys"><button type="button" class="ild-key" id="ildDone">Done</button></div>',true);
      c2.querySelector("#ildDone").onclick=function(){closeDoor();paintCard();if(opts.onDone)opts.onDone();};},
    function(e){warn(e);var c3=view('<h2>'+(written?"Protection is on, but not finished":"Protection was not turned on")+'</h2><p>'+esc(e&&e.message||"Something refused.")+(written?" Your desk is sealed; the rest will be sealed when you next sign in.":"")+'</p><div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildClose">Close</button></div>',true);
      c3.querySelector("#ildClose").onclick=function(){closeDoor();paintCard();if(written&&opts.onDone)opts.onDone();};});}

/* ---------- the password asked again, for what changes the lock ---------- */
function askPassword(title,text,okText,danger,onOk){var c=view('<h2>'+title+'</h2>'+(text?'<p>'+text+'</p>':'')+'<form id="ildAsk" autocomplete="off"><label><span>Your password</span><input type="password" id="ildPw" autocomplete="current-password"></label>'
    +'<div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildCancel">Cancel</button><button type="submit" class="ild-key'+(danger?' ild-danger':'')+'">'+esc(okText)+'</button></div></form>',true);
  c.querySelector("#ildCancel").onclick=closeDoor;
  c.querySelector("#ildAsk").onsubmit=function(e){e.preventDefault();var pw=c.querySelector("#ildPw").value;if(!pw){err(c,"Type your password.");return;}busyKeys(c,true);err(c,"");
    openWith(REC,pw,"dek").then(function(r){onOk(pw,r,c);},function(){busyKeys(c,false);err(c,"That is not the password. Nothing was changed.");var i=c.querySelector("#ildPw");if(i){i.value="";try{i.focus();}catch(_){}}});};}
function changePassword(){askPassword("Change the password","Your present password first.","Next",false,function(){
  var c=view('<h2>Choose the new password</h2><p>Only the lock changes: nothing is sealed again, and the recovery phrase stays as it is.</p><form id="ildCp" autocomplete="off">'+pwFields("A new password (at least eight characters)","The same password again")
    +'<div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildCancel">Cancel</button><button type="submit" class="ild-key">Change it</button></div></form>',true);
  c.querySelector("#ildCancel").onclick=closeDoor;
  c.querySelector("#ildCp").onsubmit=function(e){e.preventDefault();var pw=pwCheck(c);if(!pw)return;busyKeys(c,true);rewrap(pw).then(function(){closeDoor();toast("The password is changed.");},function(x){busyKeys(c,false);err(c,x&&x.message||"The password could not be changed.");});};});}
function showRecovery(){askPassword("Show the recovery phrase","Your password first; the phrase is shown to no one without it.","Show it",false,function(pw,r){
  if(!REC.phr){view('<h2>Your recovery phrase</h2><p>This copy keeps no copy of its phrase to show.</p><div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildClose">Close</button></div>',true).querySelector("#ildClose").onclick=closeDoor;return;}
  dec(r.dek,b64d(REC.phr.iv),"ingenium-lock phrase",b64d(REC.phr.ct)).then(function(u8){var w=TD.decode(u8).split(" ");
    var c=view('<h2>Your recovery phrase</h2><p>The ten words that open this copy if the password is forgotten. Keep them away from this device, and from anyone who should not open it.</p>'+wordsHtml(w)
      +'<div class="ild-keys"><button type="button" class="ild-key" id="ildClose">Close</button></div>',true);c.querySelector("#ildClose").onclick=closeDoor;},function(){closeDoor();toast("The phrase could not be read.");});});}
function disableAsk(){askPassword("Turn protection off","Everything sealed on this device is written back as plain text, the sign-in goes, and the recovery phrase is of no further use. Your password first.","Turn it off",true,function(){disable();});}
function disable(){var c=progressView("Turning protection off");prog(c,"Writing your desk back as plain text…",0.1);OFF=true;
  try{W_.saveState();}catch(e){}
  return walkBig("open",function(n,N){prog(c,"Opening the long texts on this device: "+n+" of "+N+"…",0.15+0.55*(N?n/N:1));})
    .then(function(){return walkRecs("open",function(n,N){prog(c,"Opening what you brought in from elsewhere, the signing keys and Fabrica\'s pages: "+n+" of "+N+"…",0.7+0.25*(N?n/N:1));});})
    .then(function(){return walkLegacy("open");})
    .then(function(){
      try{localStorage.removeItem(LSK);}catch(e){}REC=null;dropKeys();OFF=false;try{W_.SNAPRING.forEach(function(k){localStorage.removeItem(k);});W_._snapAt=0;}catch(e){}try{W_.saveState();}catch(e){}
      prog(c,"Done.",1);var c2=view('<h2>Protection is off</h2><p>Ingenium opens without a sign-in again, and what it keeps on this device is plain text, as it was before. The recovery phrase you wrote down opens nothing now.</p><div class="ild-keys"><button type="button" class="ild-key" id="ildDone">Done</button></div>',true);
      c2.querySelector("#ildDone").onclick=function(){closeDoor();paintCard();};},
    function(e){warn(e);OFF=false;var c3=view('<h2>Protection is still on</h2><p>'+esc(e&&e.message||"Something refused.")+' Your desk and the texts already opened are plain; the rest is still sealed, so protection stays on until it can finish.</p><div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildClose">Close</button></div>',true);
      try{W_.saveState();}catch(_){}c3.querySelector("#ildClose").onclick=function(){closeDoor();paintCard();};});}

/* ---------- Lock now, and the lock after time away: the desk saved and sealed first, then the page starts again with nothing of the session in memory ---------- */
var GOING=false,ACT=Date.now(),IDLE_T=null,IDLE_MS=null,ACT_ON=false;
function busyWhat(){try{if(D.querySelector("#page-chat .msg-live")||W_.liveBot)return "A reply is still being written.";}catch(e){}try{if(W_.__ingBuilding)return "A build is still running.";}catch(e){}
  try{if(D.querySelector("#fb .f-toast"))return "Fabrica is still making something.";}catch(e){}try{var LX=W_.LX;if(LX&&(LX.busy||LX.writing))return "The reading page is still writing.";}catch(e){}return "";}
function lockNow(why){if(GOING||!on())return Promise.resolve(false);var busy=busyWhat();
  if(busy&&why==="idle"){ACT=Date.now();return Promise.resolve(false);}
  var ask=busy&&typeof W_.ingAsk==="function"?W_.ingAsk({title:"Lock Ingenium now?",text:busy+" Locking stops it, and the part not yet finished may be lost. Everything already saved stays.",yes:"Lock now",no:"Keep waiting"}):Promise.resolve(true);
  return Promise.resolve(ask).then(function(ok){if(!ok)return false;GOING=true;
    /* what was typed in the chat's box and not yet sent is kept with the sealed desk, and put back after the sign-in */
    try{var ci=$("chatInput");if(ci&&ci.value&&ci.value.trim()&&W_.state)W_.state.__lockDraft=ci.value;}catch(e){}
    try{W_.saveState();}catch(e){}try{flushSync();}catch(e){}
    try{if(W_.__ingBoot){W_.__ingBoot.look(D.body.getAttribute("data-theme")==="night");W_.__ingBoot.again(why==="idle"?"Locked after time away. Sign in to open your desk again.":"Locked. Sign in to open your desk again.");}}catch(e){}
    setTimeout(function(){try{location.reload();}catch(e){location.href=location.href;}},350);return true;});}
function idleMs(){if(IDLE_MS!=null)return IDLE_MS;var m=REC&&typeof REC.idle==="number"?REC.idle:15;return m>0?m*60000:0;}
function startIdle(){if(!ACT_ON){ACT_ON=true;["pointerdown","keydown","wheel","touchstart","mousemove"].forEach(function(ev){try{W_.addEventListener(ev,function(){ACT=Date.now();},{passive:true,capture:true});}catch(e){}});}
  if(IDLE_T)clearInterval(IDLE_T);IDLE_T=setInterval(function(){var ms=idleMs();if(!ms||!on()||GOING)return;if(Date.now()-ACT>=ms)lockNow("idle");},IDLE_MS!=null?Math.max(100,Math.round(IDLE_MS/4)):15000);}

/* ---------- Settings, Your data: the card ---------- */
function ensureCard(){var pg=$("page-settings");if(!pg)return null;var c=$("ingLockCard");if(c)return c;
  c=D.createElement("div");c.className="card";c.id="ingLockCard";c.setAttribute("role","region");c.setAttribute("aria-labelledby","ingLockH");
  c.innerHTML='<h2 class="sec" id="ingLockH">Your data, protected with a sign-in</h2><div class="ild-top"><p class="small" id="ingLockSay"></p><div class="ild-row" id="ingLockKeys"></div></div>'
    +'<details class="ild-more" id="ingLockMoreD"><summary>What is sealed, and what is not</summary><p class="small muted" id="ingLockMore"></p></details>';
  /* before the Storage card, which stays just before Data on this device; where the page has no Storage card, before that one */
  var ex=$("exportApp"),dataCard=ex&&ex.closest?ex.closest(".card"):null,stx=$("stxCard"),at=(stx&&stx.parentNode)?stx:dataCard;if(at&&at.parentNode)at.parentNode.insertBefore(c,at);else pg.appendChild(c);
  paintCard();return c;}
function paintCard(){var c=$("ingLockCard");if(!c)return;var say=$("ingLockSay"),keys=$("ingLockKeys"),more=$("ingLockMore"),md=$("ingLockMoreD");keys.innerHTML="";if(md)md.hidden=false;
  function key(t,cls,fn){var b=D.createElement("button");b.type="button";b.className="btn small"+(cls?" "+cls:"");b.textContent=t;b.onclick=fn;keys.appendChild(b);return b;}
  if(!S()){say.innerHTML='<span class="ild-state">Off.</span> '+esc(CANT);more.textContent="";if(md)md.hidden=true;return;}
  if(!REC){say.innerHTML='<span class="ild-state">Off.</span> Ingenium opens without a sign-in, and what it keeps on this device is plain text, as it always was.';
    key("Protect this copy with a sign-in…","",function(){setup({});});
    more.textContent="Turning it on asks for a name and a password, shows a recovery phrase of ten words once, then seals what is already on this device: your desk, the long texts, the conversations you brought in from elsewhere, the signing keys and Fabrica's issues and pages. Backups made from the Backup page stay plain zips; the carried apps' own documents in their frames, your model files and the app library are not sealed.";return;}
  say.innerHTML='<span class="ild-state">On.</span> Signed in as '+esc(REC.user||"")+'. Your desk and the rest of what is listed below are sealed with your password'+(migrating()?" (the rest is still being sealed)":"")+'.';
  key("Lock now","",function(){lockNow("key");});
  key("Change the password…","ghost",changePassword);
  key("Show the recovery phrase…","ghost",showRecovery);
  key("Turn protection off…","ghost",disableAsk);
  var lab=D.createElement("label");lab.className="small";lab.style.cssText="display:inline-flex;align-items:center;gap:6px";lab.innerHTML='Lock on its own after <select id="ingLockIdle" aria-label="Lock on its own after"><option value="5">5 minutes</option><option value="15">15 minutes</option><option value="60">an hour</option><option value="0">never</option></select> away';
  keys.appendChild(lab);var sel=lab.querySelector("select");sel.value=String(typeof REC.idle==="number"?REC.idle:15);
  sel.onchange=function(){var m=parseInt(sel.value,10)||0;patchRec(function(r){r.idle=m;});toast(REC.idle?"Ingenium will lock after "+idleWords(REC.idle)+" away.":"Ingenium will lock only when you press Lock now.");};
  more.textContent="Sealed: the desk (chats, notes, settings, projects, documents, Career) in this browser's store and its recovery shelf; the long texts (attachments, pages, documents), the conversations you brought in from elsewhere, the signing keys and Fabrica's issues and pages in the larger store; and on the computer apps the copies on disk written from now on. Not sealed: backups made from the Backup page (plain zips, as before), the carried apps' own documents in their frames, model files, the app library and Fabrica's saved versions of your apps, and on the computer apps the earlier copies of the desk kept in desk-backups. While protection is on, a window of its own opened from an app does not share your notes and reminders with the main window (that shared copy would hold them in plain text).";}

/* ---------- the welcome door: a third choice beside Enter ---------- */
function doorKey(){var en=$("introEnter");if(!en||$("introProtect")||$("introProtectNote")||REC)return;
  if(!S()){var p=D.createElement("p");p.className="intro-protect-line";p.id="introProtectNote";p.textContent="A sign-in with a password can be added from Settings when this copy is opened in the Ingenium apps, or at localhost or over https.";en.parentNode.insertBefore(p,en.nextSibling);return;}
  /* a quiet line under Enter, in the look of the tour's own link, so the door still has one clear key */
  var b=D.createElement("button");b.type="button";b.className="intro-tour";b.id="introProtect";b.textContent="Protect this copy with a sign-in";
  b.onclick=function(){setup({onDone:function(){try{W_.hideIntro();}catch(e){}}});};
  var p2=D.createElement("p");p2.className="intro-protect-line";p2.id="introProtectLine";
  var sub=D.createElement("span");sub.textContent="Optional: a name and a password at the door, and everything Ingenium keeps on this device sealed with them.";
  p2.appendChild(b);p2.appendChild(D.createElement("br"));p2.appendChild(sub);
  en.parentNode.insertBefore(p2,en.nextSibling);}

/* ---------- at boot ---------- */
function noRecord(){var c=view('<h1>Ingenium</h1><p class="ild-sub">This copy\'s desk is sealed, but the lock that opens it is missing from this browser\'s store.</p>'
    +'<p>A sealed desk opens only with its own lock record and the password. If the lock was removed by hand or by clearing part of the store, the desk here cannot be opened. You can start with an empty desk: the sealed one is kept aside, not destroyed.</p>'
    +'<div class="ild-keys"><button type="button" class="ild-key ild-ghost" id="ildRefresh">Refresh</button><button type="button" class="ild-key ild-danger" id="ildFresh">Start with an empty desk</button></div>',false);
  c.querySelector("#ildRefresh").onclick=function(){location.reload();};
  c.querySelector("#ildFresh").onclick=function(){busyKeys(c,true);startOver();};}
/* starting again with an empty desk, when what is sealed here cannot be opened: the sealed desk and its lock record are moved aside in
   this browser's store, never destroyed; the larger store's copy and, on the computer apps, the copy on disk are set aside as well
   (the disk's among the desk's kept copies), so neither brings the sealed desk straight back */
function startOver(){var ts=Date.now(),raw=null,rec=null;
  try{(W_.SNAPRING||[]).forEach(function(k){localStorage.removeItem(k);});}catch(e){}
  try{raw=localStorage.getItem(W_.KEY)||W_.__ingLockedRaw||null;rec=localStorage.getItem(LSK);localStorage.removeItem(W_.KEY);localStorage.removeItem(LSK);}catch(e){}
  try{if(raw)localStorage.setItem(W_.KEY+".sealed-"+ts,raw);}catch(e){warn(e);}
  try{if(rec)localStorage.setItem(LSK+".sealed-"+ts,rec);}catch(e){}
  REC=null;dropKeys();
  var side=new Promise(function(res){try{var rq=indexedDB.open("ingenium_desk",1);rq.onupgradeneeded=function(){try{rq.result.createObjectStore("d");}catch(e){}};
      rq.onsuccess=function(){var d=rq.result;try{var t=d.transaction("d","readwrite"),st=t.objectStore("d"),g=st.get("desk");
          g.onsuccess=function(){var v=g.result;if(v&&typeof v.raw==="string"&&isDeskEnv(v.raw))st.put(v,"desk.sealed-"+ts);st.put({lsOk:true,raw:null,at:ts},"desk");};
          t.oncomplete=t.onerror=t.onabort=function(){try{d.close();}catch(e){}res();};}catch(e){try{d.close();}catch(_){}res();}};
      rq.onerror=rq.onblocked=function(){res();};}catch(e){res();}});
  var sh=rawShell(),api=api0();
  return side.then(function(){if(!sh||!api)return;return Promise.resolve().then(function(){if(raw&&typeof api.desk_keep_text==="function")return api.desk_keep_text(raw,"sealed-aside");}).catch(function(){})
      .then(function(){if(typeof sh.save_state==="function")return sh.save_state.call(api,"{}");}).catch(function(){});})
    .then(function(){setTimeout(function(){try{location.reload();}catch(e){}},200);});}
function cantHere(){var c=view('<h1>Ingenium</h1><p class="ild-sub">This copy is protected with a sign-in.</p><p>'+CANT+'</p><div class="ild-keys"><button type="button" class="ild-key" id="ildRefresh">Refresh</button></div>',false);c.querySelector("#ildRefresh").onclick=function(){location.reload();};}
function boot(){if(!W_.__ingLocked&&!REC)return;
  /* a lock record that cannot be read, and no sealed desk to open: what was found is a plain desk (or none), so it is taken as it is */
  if(W_.__ingLocked&&!REC&&!(W_.__ingLockedRaw&&isDeskEnv(W_.__ingLockedRaw))){var pr=W_.__ingLockedRaw;try{if(pr)adoptPlain(pr);else{W_.__ingLocked=false;W_.__ingLockedRaw=null;}}catch(e){warn(e);try{if(pr)localStorage.setItem(W_.KEY+".broken-"+Date.now(),pr);}catch(_){}W_.__ingLocked=false;W_.__ingLockedRaw=null;}return;}
  try{if(W_.__ingBoot)W_.__ingBoot.again("Sign in to open your desk.");}catch(e){}
  if(W_.__ingLocked&&!REC){noRecord();return;}
  if(!S()){cantHere();return;}
  signIn();}
function selfTest(){if(!S())return Promise.resolve(false);var raw=rnd(32),js=jsGcm(raw),iv=rnd(12),aad="self-test",pt=TE.encode("The quick brown fox jumps over the lazy dog. ".repeat(700)+"end");
  return importDek(raw).then(function(k){return enc(k,iv,aad,pt);}).then(function(a){var b=js.seal(iv,TE.encode(aad),pt);if(a.length!==b.length)return false;for(var i=0;i<a.length;i++)if(a[i]!==b[i])return false;return true;});}

/* ---------- wiring ---------- */
wrapGc();
wrapShell();try{W_.addEventListener("pywebviewready",function(){setTimeout(wrapShell,0);});}catch(e){}
var tries=0,wiv=setInterval(function(){tries++;wrapShell();var a=api0();if((a&&a.__r197)||tries>40)clearInterval(wiv);},150);
W_.addEventListener("pagehide",flushSync);D.addEventListener("visibilitychange",function(){if(D.hidden)flushSync();});
/* the recovery shelf never takes a plain desk while the lock is on (the shelf's own restore writes the present desk to it) */
if(typeof W_.ingNoteSnapshot==="function"&&!W_.ingNoteSnapshot.__r197){var ons=W_.ingNoteSnapshot;var wns=function(raw){if(on()&&typeof raw==="string"&&!isDeskEnv(raw)&&K.js){try{raw=sealDeskSync(raw,null);}catch(e){return;}}return ons.call(this,raw);};wns.__r197=1;W_.ingNoteSnapshot=wns;}
/* the recovery shelf (Settings, Data on this device, Recover an earlier moment): with the lock on its moments are sealed, so they are
   opened in memory before the shelf counts what each holds and compares it with now; returning to one writes the sealed moment back,
   as before. With the lock off nothing here runs. */
var SHELF={};
function shelfOpen(){SHELF={};var snaps=[];try{snaps=W_.ingSnapshots()||[];}catch(e){}
  return seq(snaps,function(x){var h=deskHead(x.raw);if(!h)return;return openDesk(x.raw).then(function(t){try{SHELF[h.body]=JSON.parse(t);}catch(e){}},function(){});});}
function wrapShelf(){try{if(typeof W_.shelfSummary==="function"&&!W_.shelfSummary.__r197){var os=W_.shelfSummary;
      var ws=function(st){if(st&&st.ing==="locked"&&typeof st.body==="string"){var o=SHELF[st.body];
          if(o)st=o;else{var n=st.n||{};return {chats:n.chats||0,msgs:n.messages||0,notes:0,parked:0,models:0,projects:0,blends:0,sources:0,titles:[]};}}
        return os.call(this,st);};ws.__r197=1;W_.shelfSummary=ws;}}catch(e){warn(e);}
  try{if(typeof W_.recoverShow==="function"&&!W_.recoverShow.__r197){var orv=W_.recoverShow;
      var wr=function(){var self=this,a=arguments;if(!on())return orv.apply(self,a);return shelfOpen().then(function(){return orv.apply(self,a);});};wr.__r197=1;W_.recoverShow=wr;}}catch(e){warn(e);}
  try{var b=$("recoverSnap");if(b&&!b.__r197){b.__r197=1;var oc=b.onclick;if(typeof oc==="function")b.onclick=function(ev){var self=this;if(!on())return oc.call(self,ev);shelfOpen().then(function(){oc.call(self,ev);});};}}catch(e){warn(e);}}
wrapShelf();
/* another window of this copy changed the lock: the password or the time away is taken up here; protection turned off there is off here
   too; a window still at the sign-in starts again, to meet what the other one left */
W_.addEventListener("storage",function(e){if(!e||e.key!==LSK)return;
  if(W_.__ingLocked&&!K.key){if(!GOING){GOING=true;setTimeout(function(){try{location.reload();}catch(_){}},200);}return;}
  if(e.newValue==null){if(REC&&K.key){OFF=true;REC=null;try{paintCard();}catch(_){}}return;}
  if(!REC&&!K.key&&e.newValue&&!W_.__ingLocked){GOING=true;W_.__ingLocked=true;setTimeout(function(){try{location.reload();}catch(_){}},200);return;}
  var r=readRec();if(r&&REC&&r.made===REC.made){REC=r;try{paintCard();}catch(_){}}});
try{var og=W_.go;if(typeof og==="function"){W_.go=function(p){var r=og.apply(this,arguments);try{if(p==="settings")ensureCard();}catch(e){}return r;};}}catch(e){}
setTimeout(function(){try{ensureCard();}catch(e){}},600);
try{doorKey();}catch(e){warn(e);}
W_.IngLock={active:active,on:on,locked:function(){return active()&&!canOpen();},ready:ready,sealed:sealed,sealText:sealText,openText:openText,sealTextSync:sealTextSync,
  deskWrite:deskWrite,isDeskEnvelope:isDeskEnv,openDesk:openDesk,adoptRaw:adoptRaw,lockedNow:adoptRaw,openRecs:openRecs,sealRecs:sealRecs,sealRec:sealRec,openRec:openRec,openValues:openValues,lockNow:lockNow,
  setup:function(){setup({});},user:function(){return REC?REC.user:null;},words:WORDS.slice(),
  _test:{idle:function(ms){IDLE_MS=ms;startIdle();},selfTest:selfTest,record:readRec,flush:flushSync,pending:function(){return W.seq-W.committed;},seal:function(){return W.seq;}}};
try{boot();}catch(e){warn(e);}
})();
;try{window.__ingParts["p197"]="running";}catch(_){}
</script>
