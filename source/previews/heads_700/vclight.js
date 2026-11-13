var VCL=(function(){var x=-.5,y=-.62,z=.6,l=Math.sqrt(x*x+y*y+z*z);return [x/l,y/l,z/l];})();
var VCE1=(function(){var x=-VCL[2],z=VCL[0],l=Math.sqrt(x*x+z*z);return [x/l,0,z/l];})(),VCE2=[VCL[1]*VCE1[2]-VCL[2]*VCE1[1],VCL[2]*VCE1[0]-VCL[0]*VCE1[2],VCL[0]*VCE1[1]-VCL[1]*VCE1[0]];
function vcS(a,b,x){var t=(x-a)/(b-a);t=t<0?0:t>1?1:t;return t*t*(3-2*t);}
function vcWin(x,y,z){if(x*VCL[0]+y*VCL[1]+z*VCL[2]<.6)return 0;var a=Math.abs(x*VCE1[0]+y*VCE1[1]+z*VCE1[2]),b=Math.abs(x*VCE2[0]+y*VCE2[1]+z*VCE2[2]);return (1-vcS(.17,.215,a))*(1-vcS(.25,.3,b));}
function vcEnv(x,y,z,nt,o){var up=-y,r,g,b,a,f;
  if(nt){a=.22+.2*vcS(-.2,.85,up);r=a*.92;g=a*.9;b=a*1.22;f=vcS(0,.7,-up);r-=f*.15;g-=f*.14;b-=f*.18;}
  else{a=.86+.13*vcS(-.2,.9,up);r=a*.985;g=a*.98;b=a;f=vcS(-.05,.65,-up);r-=f*.4;g-=f*.4;b-=f*.36;}
  var hz=(1-vcS(.1,.28,Math.abs(y)))*(1-vcS(.5,.78,z))*.85,hd=nt?.07:.28;r+=(hd-r)*hz;g+=(hd-g)*hz;b+=(hd*1.12-b)*hz;
  var cam=vcS(.88,.975,z)*.8,cd=nt?.1:.5;r+=(cd-r)*cam;g+=(cd-g)*cam;b+=(cd*1.08-b)*cam;
  var k=vcWin(x,y,z);r+=k*1.3;g+=k*1.3;b+=k*1.34;
  var fs=vcS(.55,.72,x)*(1-vcS(.25,.5,Math.abs(y+.1)));r+=fs*(nt?.55:.6);g+=fs*(nt?.53:.6);b+=fs*(nt?.68:.64);
  o[0]=r<0?0:r;o[1]=g<0?0:g;o[2]=b<0?0:b;}
function vcTone(v){return v<.8?(v<0?0:v):.8+.2*(1-Math.exp(-(v-.8)*5));}
function vcSilver(nx,ny,nz,nt,o){var l=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=l;ny/=l;nz/=l;var d=2*nz;vcEnv(d*nx,d*ny,d*nz-1,nt,o);
  o[0]=vcTone(o[0]*.965);o[1]=vcTone(o[1]*.96);o[2]=vcTone(o[2]*.975);}
function vcEnamel(nx,ny,nz,base,nt,o){var l=Math.sqrt(nx*nx+ny*ny+nz*nz);nx/=l;ny/=l;nz/=l;var dl=nx*VCL[0]+ny*VCL[1]+nz*VCL[2],df=.62+.5*(dl<0?0:dl),d=2*nz;
  vcEnv(d*nx,d*ny,d*nz-1,nt,o);var fr=.035+.5*Math.pow(1-nz,5),k=vcWin(d*nx,d*ny,d*nz-1);
  o[0]=vcTone(base[0]*df+o[0]*fr+k*.42);o[1]=vcTone(base[1]*df+o[1]*fr+k*.42);o[2]=vcTone(base[2]*df+o[2]*fr+k*.46);}
