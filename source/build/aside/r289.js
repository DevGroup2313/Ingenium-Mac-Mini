<style id="r289-css">
/* ============ R289 · BUILD'S HEAD: THE PRISM OF YOUR PAGE (Ingenium 6.93; drawn again 13 November 2026, held for the owner's live preview) ============
   The owner's answer (12 November 2026) on what the Build page should get: "A 3D head like the rest". On the light of the live previews:
   "I want the light passing through the prism, I want to see that beautiful 3D visual rendering of that"; "The light through the prism
   is genuinely horrible"; choosing "real glowing light drawn with your computer's graphics chip (soft bloom, light pooling, a true
   spectrum)"; and on the drawing that followed (13 November 2026): "The prism light is honestly the worst thing that I have seen yet
   and it is genuinely a truly ugly primitive design and animation". So the whole scene is now one picture drawn by the graphics chip
   (WebGL), ray by ray, as a camera would see it:
   - a prism of solid glass (a triangle of 1.6 units a side, 1.04 deep) with rounded edges, standing on a turned plinth: each ray that
     meets the glass is reflected (Schlick's approximation of Fresnel's equations) and bent at the face it enters and the face it
     leaves (Snell's law, with total internal reflection where it falls), separately for red, green and blue (so the glass fringes
     with colour at its edges), and dimmed a little by the glass's own violet tint over the length it travels inside;
   - a beam of white light that enters the left face, is bent, crosses the glass (glowing faintly inside it) and leaves the right face
     as a fan: the path is worked out each frame by Snell's law with a refractive index that varies with wavelength (Cauchy's form,
     its spread widened about five times for the eye), and every point of the fan takes the colour of its own wavelength through the
     eye's colour matching functions (the CIE 1931 observer, in Wyman, Sloan and Shirley's analytic fit, Journal of Computer Graphics
     Techniques, 2013), so it runs red to violet without bands; where the fan meets the plinth, the light pools there as a spectrum;
   - motes of dust drift through the beam and the fan and catch their light; a soft glow surrounds the beam and the points where it
     enters and leaves. By night the light is added as light; by day it colours what it falls on, so it reads on a pale page;
   - a turned plinth, its top cut in fine rings with a highlight across them, engraved with a ring of ticks, lit from the upper left,
     with the glass's lighter shadow and a soft darkening where the glass stands.
   It never stops: the camera sways round the prism on one slow period of twenty-four seconds (as Focus's instrument), and the beam's
   angle drifts in the same period, so the spectrum slides across the plinth; under the pointer the view leans toward it on a spring
   and the light brightens; pressed, it knocks and a pulse of light runs along the beam, through the glass and out across the fan,
   and your page runs. Beside it, how many lines your code has and whether the page runs as you type. Minimal and reduced motion keep
   it still, drawn once. It is drawn only while it can be seen, at a resolution that falls if the computer cannot keep up. Where the
   web view has no WebGL, a simple drawing stands in. */
#page-build.hd-on > .hd-head .hd-tag{right:6px;top:30px;max-width:200px}
#page-build.hd-on .hd-hit{border-radius:24px}
</style>
<script>try{(window.__ingParts=window.__ingParts||{})["p289"]="started";}catch(_){}
/* R289 · Build's head, the prism of your page: see the note at the top of its styles */
(function(){"use strict";
if(window.__r289)return;window.__r289=1;
var D=document,W=window,TAU=Math.PI*2,H=null,PERIOD=24000;
var B={C:null,cv:null,t:0,amp:1,hold:false,hover:false,down:false,lift:0,loop:null,W:520,H:460,flare:0,tx:0,ty:0,ly:null,lp:null,kn:null,q:1,slow:0,fast:0,path:null,hit:null};
function $(id){return D.getElementById(id);}
function mk(t,c,txt){var e=D.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
/* ---------- the glass and the light's path through it (the same shape the shader draws) ---------- */
var PX=-0.30,HA=0.80,YB=-0.80,TARGET=[0.14,-0.52,0];
function nrm(v){var l=Math.sqrt(v.reduce(function(s,x){return s+x*x;},0))||1;return v.map(function(x){return x/l;});}
function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function dot3(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
/* the glass's index at a wavelength (micrometres): Cauchy's form about 1.522, its spread widened for the eye */
function nLam(l){return 1.522+0.0238*(1/(l*l)-1/(0.55*0.55));}
function refr2(d,n,eta){var ci=-(d[0]*n[0]+d[1]*n[1]),k=1-eta*eta*(1-ci*ci);if(k<0)return null;var bb=eta*ci-Math.sqrt(k);return nrm([eta*d[0]+bb*n[0],eta*d[1]+bb*n[1]]);}
/* the beam enters the left face at a fixed point, at the angle of least deviation plus the drift (degrees) */
function path(drift){var nL=[-0.8660254,0.5],nR=[0.8660254,0.5],dL=-0.8660254*(PX-HA)+0.5*YB,dR=0.8660254*(PX+HA)+0.5*YB;
  var yE=-0.40,xE=(0.5*yE-dL)/0.8660254,P1=[xE,yE],ai=(19.46+drift)*Math.PI/180,din=[Math.cos(ai),Math.sin(ai)],S=[P1[0]-din[0]*7,P1[1]-din[1]*7];
  function through(l){var n=nLam(l),d1=refr2(din,nL,1/n);if(!d1)return null;var t=(dR-(nR[0]*P1[0]+nR[1]*P1[1]))/(nR[0]*d1[0]+nR[1]*d1[1]),P2=[P1[0]+d1[0]*t,P1[1]+d1[1]*t],d2=refr2(d1,[-nR[0],-nR[1]],n);return d2?{P2:P2,d:d2}:null;}
  var m=through(0.55),r=through(0.70),v=through(0.40);if(!m||!r||!v)return B.path;
  return {S:S,P1:P1,P2:m.P2,red:Math.atan2(r.d[1],r.d[0]),violet:Math.atan2(v.d[1],v.d[0])};}
/* the camera: round the prism on its sway and lean, a little above it */
function camera(yaw,pitch,dist){var cp=Math.cos(pitch),T=TARGET,pos=[T[0]+dist*Math.sin(yaw)*cp,T[1]+dist*Math.sin(pitch),T[2]+dist*Math.cos(yaw)*cp];
  var F=nrm([T[0]-pos[0],T[1]-pos[1],T[2]-pos[2]]),R=nrm(cross(F,[0,1,0])),U=cross(R,F);return {pos:pos,R:R,U:U,F:F,fov:0.31};}
function project(c,X){var v=[X[0]-c.pos[0],X[1]-c.pos[1],X[2]-c.pos[2]],z=dot3(v,c.F);return [B.W/2+dot3(v,c.R)/z/(2*c.fov)*B.H,B.H/2-dot3(v,c.U)/z/(2*c.fov)*B.H];}
var BASE_YAW=-0.42,BASE_PITCH=0.27,DIST=6.2;
/* ---------- the shader ---------- */
var FS=[
"#ifdef GL_FRAGMENT_PRECISION_HIGH",
"precision highp float;",
"#else",
"precision mediump float;",
"#endif",
"uniform vec2 uRes;",
"uniform vec3 uCam;",
"uniform vec3 uCR;",
"uniform vec3 uCU;",
"uniform vec3 uCF;",
"uniform float uFov;",
"uniform float uNight;",
"uniform float uT;",
"uniform vec3 uS;",
"uniform vec3 uP1;",
"uniform vec3 uP2;",
"uniform vec2 uFan;",
"uniform float uPulse;",
"uniform float uGlow;",
"uniform vec3 uBg0;",
"uniform vec3 uBg1;",
"const float PX = -0.30;",
"const float HA = 0.80;",
"const float YB = -0.80;",
"const float DZ = 0.52;",
"const float RP = 1.72;",
"const float PH = 0.19;",
"const float BEV = 0.032;",
"const float WZ = 0.028;",
"vec4 plane(int i) {",
"  if (i == 0) return vec4(0.0, -1.0, 0.0, -YB);",
"  if (i == 1) return vec4(-0.8660254, 0.5, 0.0, -0.8660254 * (PX - HA) + 0.5 * YB);",
"  if (i == 2) return vec4(0.8660254, 0.5, 0.0, 0.8660254 * (PX + HA) + 0.5 * YB);",
"  if (i == 3) return vec4(0.0, 0.0, 1.0, DZ);",
"  return vec4(0.0, 0.0, -1.0, DZ);",
"}",
"bool prismHit(vec3 ro, vec3 rd, out float tn, out vec3 nn) {",
"  tn = -1e9; float tf = 1e9; nn = vec3(0.0, 1.0, 0.0);",
"  for (int i = 0; i < 5; i++) {",
"    vec4 P = plane(i);",
"    float den = dot(P.xyz, rd), dist = P.w - dot(P.xyz, ro);",
"    if (abs(den) < 1e-6) { if (dist < 0.0) return false; }",
"    else {",
"      float t = dist / den;",
"      if (den < 0.0) { if (t > tn) { tn = t; nn = P.xyz; } }",
"      else { if (t < tf) tf = t; }",
"    }",
"  }",
"  return tn < tf && tn > 1e-4;",
"}",
"float prismExit(vec3 ro, vec3 rd, out vec3 n) {",
"  float tf = 1e9; n = vec3(0.0, 1.0, 0.0);",
"  for (int i = 0; i < 5; i++) {",
"    vec4 P = plane(i);",
"    float den = dot(P.xyz, rd);",
"    if (den > 1e-6) { float t = (P.w - dot(P.xyz, ro)) / den; if (t < tf) { tf = t; n = P.xyz; } }",
"  }",
"  return tf;",
"}",
"vec3 bevel(vec3 p, vec3 n) {",
"  vec3 acc = n;",
"  for (int i = 0; i < 5; i++) {",
"    vec4 P = plane(i);",
"    if (dot(P.xyz, n) > 0.99) continue;",
"    float e = P.w - dot(P.xyz, p);",
"    float w = 1.0 - smoothstep(0.0, BEV, e);",
"    acc += P.xyz * w * w * 1.15;",
"  }",
"  return normalize(acc);",
"}",
"vec3 toLin(vec3 c) { return c * c; }",
"float g1(float x, float m, float a, float b) { float s = x < m ? a : b; float d = (x - m) / s; return exp(-0.5 * d * d); }",
"vec3 spectrum(float l) {",
"  float X = 1.056 * g1(l, 599.8, 37.9, 31.0) + 0.362 * g1(l, 442.0, 16.0, 26.7) - 0.065 * g1(l, 501.1, 20.4, 26.2);",
"  float Y = 0.821 * g1(l, 568.8, 46.9, 40.5) + 0.286 * g1(l, 530.9, 16.3, 31.1);",
"  float Z = 1.217 * g1(l, 437.0, 11.8, 36.0) + 0.681 * g1(l, 459.0, 26.0, 13.8);",
"  vec3 c = vec3(3.2406 * X - 1.5372 * Y - 0.4986 * Z, -0.9689 * X + 1.8758 * Y + 0.0415 * Z, 0.0557 * X - 0.2040 * Y + 1.0570 * Z);",
"  c += vec3(0.06) * Y;",
"  return max(c, vec3(0.0));",
"}",
"vec3 addLight(vec3 base, vec3 light) {",
"  if (uNight > 0.5) return base + light;",
"  float I = max(max(light.r, light.g), light.b);",
"  if (I < 1e-5) return base;",
"  float a = 1.0 - exp(-I * 3.0);",
"  return base * mix(vec3(1.0), light / I, a) * (1.0 - 0.22 * a);",
"}",
"vec3 keyDir() { return normalize(vec3(-0.55, 0.78, 0.42)); }",
"vec3 env(vec3 d) {",
"  vec3 sky = mix(uBg1, uBg0, smoothstep(-0.35, 0.7, d.y));",
"  float day = 1.0 - uNight;",
"  sky = mix(sky, vec3(0.36, 0.31, 0.50), smoothstep(0.02, -0.3, d.y) * day * 0.85);",
"  float card = exp(-pow((abs(d.x) - 0.80) / 0.16, 2.0)) * smoothstep(-0.25, 0.15, d.y) * (1.0 - smoothstep(0.45, 0.8, d.y));",
"  sky *= 1.0 - 0.8 * card * day;",
"  sky = mix(sky, vec3(0.012, 0.008, 0.02), smoothstep(0.05, -0.4, d.y) * uNight * 0.6);",
"  vec3 L = normalize(vec3(-0.62, 0.62, 0.48));",
"  vec3 u = normalize(cross(L, vec3(0.0, 1.0, 0.0)));",
"  vec3 v = cross(u, L);",
"  float k = dot(d, L);",
"  vec3 c = sky;",
"  if (k > 0.0) {",
"    float a = dot(d, u) / k, b = dot(d, v) / k;",
"    float box = (1.0 - smoothstep(0.34, 0.46, abs(a))) * (1.0 - smoothstep(0.20, 0.30, abs(b)));",
"    c += box * mix(vec3(3.2, 3.1, 3.3), vec3(1.7, 1.6, 2.0), uNight);",
"  }",
"  vec3 R = normalize(vec3(0.75, 0.25, -0.62));",
"  vec3 ru = normalize(cross(R, vec3(0.0, 1.0, 0.0)));",
"  float kr = dot(d, R);",
"  if (kr > 0.0) {",
"    float a = dot(d, ru) / kr, b = (d.y - R.y * kr) / kr;",
"    float strip = (1.0 - smoothstep(0.05, 0.10, abs(a))) * (1.0 - smoothstep(0.55, 0.75, abs(b)));",
"    c += strip * mix(vec3(1.4, 1.3, 1.6), vec3(1.0, 0.85, 1.5), uNight);",
"  }",
"  return c;",
"}",
"float plinthHit(vec3 ro, vec3 rd, out vec3 n, out float top) {",
"  float t = 1e9; top = 0.0; n = vec3(0.0, 1.0, 0.0);",
"  if (rd.y < 0.0) {",
"    float tt = (YB - ro.y) / rd.y; vec3 p = ro + rd * tt;",
"    if (tt > 1e-4 && dot(p.xz, p.xz) < RP * RP) { t = tt; top = 1.0; }",
"  }",
"  float a = dot(rd.xz, rd.xz), b = dot(ro.xz, rd.xz), c = dot(ro.xz, ro.xz) - RP * RP, h = b * b - a * c;",
"  if (h > 0.0) {",
"    float ts = (-b - sqrt(h)) / a; vec3 p = ro + rd * ts;",
"    if (ts > 1e-4 && ts < t && p.y < YB && p.y > YB - PH) { t = ts; top = 0.0; n = normalize(vec3(p.x, 0.0, p.z)); }",
"  }",
"  return t;",
"}",
"vec2 segClose(vec3 ro, vec3 rd, vec3 a, vec3 b, float tmax) {",
"  vec3 v = b - a, w0 = ro - a;",
"  float bb = dot(rd, v), cc = dot(v, v), dd = dot(rd, w0), ee = dot(v, w0), den = cc - bb * bb;",
"  float s = den > 1e-6 ? clamp((ee - bb * dd) / den, 0.0, 1.0) : 0.0;",
"  float t = clamp(dot(a + v * s - ro, rd), 0.0, tmax);",
"  vec3 q = a + v * s - (ro + rd * t);",
"  return vec2(length(q), s);",
"}",
"float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }",
"float motes(vec2 q) {",
"  vec2 c = floor(q / 0.06); float m = 0.0;",
"  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {",
"    vec2 cc = c + vec2(float(i), float(j));",
"    float h = hash(cc), h2 = hash(cc + 7.3);",
"    vec2 pos = (cc + vec2(0.5) + 0.38 * vec2(sin(uT * 0.31 + h * 6.28), cos(uT * 0.23 + h2 * 6.28))) * 0.06;",
"    float d = length(q - pos);",
"    float tw = 0.5 + 0.5 * sin(uT * (1.3 + h * 2.0) + h2 * 6.28);",
"    m += step(0.55, h) * exp(-d * d / 0.000045) * tw;",
"  }",
"  return m;",
"}",
"vec3 beamTint() { return mix(vec3(0.40, 0.22, 0.95), vec3(1.0, 0.97, 1.02), uNight); }",
"float pulseAt(float s) { if (uPulse < 0.0) return 0.0; float d = s - uPulse * 3.4; return 2.8 * exp(-d * d / 0.09) * (1.0 - uPulse * 0.5); }",
"vec3 fanLight(vec3 ro, vec3 rd, float tmax) {",
"  vec3 col = vec3(0.0);",
"  if (abs(rd.z) > 1e-4) {",
"    float tz = -ro.z / rd.z;",
"    if (tz > 0.0 && tz < tmax) {",
"      vec2 q = (ro + rd * tz).xy;",
"      vec2 v = q - uP2.xy; float r = length(v);",
"      float ph = atan(v.y, v.x);",
"      float f = (ph - uFan.x) / (uFan.y - uFan.x);",
"      if (f > -0.08 && f < 1.08 && r > 0.0) {",
"        float sl = sin(ph);",
"        float land = sl < 0.0 ? (YB - uP2.y) / sl : 1e9;",
"        float xl = uP2.x + cos(ph) * land;",
"        bool cut = r > land && abs(xl) < RP;",
"        if (!cut) {",
"          float lam = 700.0 - 300.0 * clamp(f, 0.0, 1.0);",
"          float edge = smoothstep(-0.08, 0.04, f) * (1.0 - smoothstep(0.96, 1.08, f));",
"          float thick = min(3.0, 1.0 / max(abs(rd.z), 0.05)) * 0.55;",
"          float fall = 1.1 / (0.22 + r) * exp(-r * 0.25);",
"          float pulse = pulseAt(1.0 + length(uP2 - uP1) + r);",
"          vec3 sp = spectrum(lam);",
"          col += sp * edge * thick * fall * (1.0 + pulse) * (0.9 + 0.25 * uGlow);",
"          col += sp * edge * motes(q) * 2.2 * exp(-r * 0.4);",
"        }",
"      }",
"    }",
"  }",
"  return col;",
"}",
"vec3 beamGlow(vec3 ro, vec3 rd, float tmax) {",
"  vec3 tint = beamTint();",
"  vec2 a = segClose(ro, rd, uS, uP1, tmax);",
"  float d = a.x, s = a.y * length(uP1 - uS);",
"  float I = (1.0 + 0.2 * uGlow) * (exp(-d * d / 0.00012) * 1.6 + exp(-d / 0.05) * 0.22 + exp(-d * d / 0.09) * 0.05) * smoothstep(0.0, 1.2, s);",
"  I *= 1.0 + pulseAt(s - length(uP1 - uS) + 1.0);",
"  vec3 col = tint * I;",
"  if (abs(rd.z) > 1e-4) {",
"    float tz = -ro.z / rd.z;",
"    if (tz > 0.0 && tz < tmax) {",
"      vec3 q = ro + rd * tz; vec3 ab = uP1 - uS; float u = clamp(dot(q - uS, ab) / dot(ab, ab), 0.0, 1.0);",
"      float dl = length(q - (uS + ab * u));",
"      col += tint * motes(q.xy) * exp(-dl * dl / 0.0016) * 1.6;",
"    }",
"  }",
"  vec2 f1 = segClose(ro, rd, uP1, uP1, tmax), f2 = segClose(ro, rd, uP2, uP2, tmax);",
"  col += tint * (exp(-f1.x * f1.x / 0.002) * 0.5 + exp(-f1.x / 0.03) * 0.25);",
"  col += vec3(1.0, 0.95, 1.0) * mix(0.25, 1.0, uNight) * (exp(-f2.x * f2.x / 0.0015) * 0.45 + exp(-f2.x / 0.035) * 0.18);",
"  return col;",
"}",
"vec3 plinthShade(vec3 p, vec3 n, float top, vec3 rd, float t) {",
"  vec3 L = keyDir(), V = -rd;",
"  vec3 baseD = mix(vec3(0.80, 0.74, 0.93), vec3(0.075, 0.06, 0.11), uNight);",
"  vec3 c;",
"  float pix = t * 2.0 * uFov / uRes.y;",
"  if (top > 0.5) {",
"    float r = length(p.xz);",
"    vec3 nn = n;",
"    float rim = smoothstep(RP - 0.045, RP, r);",
"    nn = normalize(nn + vec3(p.x, 0.0, p.z) / r * rim * 1.4);",
"    float dif = max(dot(nn, L), 0.0);",
"    vec3 T = normalize(vec3(-p.z, 0.0, p.x));",
"    vec3 H = normalize(L + V);",
"    float th = dot(T, H);",
"    float aniso = pow(sqrt(max(0.0, 1.0 - th * th)), 70.0);",
"    float grooves = 0.5 + 0.5 * sin(r * 520.0);",
"    float gfade = 1.0 - smoothstep(0.004, 0.012, pix);",
"    c = baseD * (0.42 + 0.62 * dif);",
"    c += mix(vec3(0.20, 0.18, 0.24), vec3(0.20, 0.16, 0.30), uNight) * aniso * (0.75 + 0.5 * grooves * gfade);",
"    float ang = atan(p.z, p.x) / 6.2831853 * 72.0;",
"    float tk = abs(fract(ang) - 0.5) * 6.2831853 / 72.0 * r;",
"    float major = step(0.5, 1.0 - abs(fract(ang / 6.0 + 0.5 / 6.0) - 0.5 / 6.0) * 6.0 * 1.0);",
"    float inner = RP - mix(0.10, 0.16, major);",
"    float tick = (1.0 - smoothstep(0.0025, 0.0025 + pix, tk)) * step(inner, r) * (1.0 - step(RP - 0.035, r));",
"    c = mix(c, mix(vec3(0.50, 0.44, 0.66), vec3(0.42, 0.36, 0.58), uNight), tick * 0.75);",
"    float ring = (1.0 - smoothstep(0.0, 0.0025 + pix, abs(r - (RP - 0.175)))) * 0.5;",
"    c = mix(c, mix(vec3(0.55, 0.49, 0.70), vec3(0.32, 0.27, 0.45), uNight), ring);",
"    c += mix(vec3(0.9, 0.88, 0.95), vec3(0.55, 0.48, 0.75), uNight) * rim * pow(max(dot(reflect(-L, nn), V), 0.0), 18.0) * 0.8;",
"    float tn; vec3 sn;",
"    if (prismHit(p + vec3(0.0, 1e-3, 0.0), L, tn, sn)) c *= 0.62;",
"    vec2 dq = max(abs(p.xz - vec2(PX, 0.0)) - vec2(HA, DZ), vec2(0.0));",
"    float ao = 1.0 - 0.32 * exp(-length(dq) / 0.05);",
"    c *= ao;",
"    float in2 = step(abs(p.x - PX), HA) * step(abs(p.z), DZ);",
"    c = addLight(c, beamTint() * 0.05 * in2 * exp(-p.z * p.z / 0.02));",
"    vec2 v = p.xy - uP2.xy; float rr = length(v); float ph = atan(v.y, v.x);",
"    float f = (ph - uFan.x) / (uFan.y - uFan.x);",
"    float zf = exp(-p.z * p.z / (WZ * WZ));",
"    float zh = exp(-p.z * p.z / 0.03);",
"    if (f > -0.1 && f < 1.1) {",
"      float lam = 700.0 - 300.0 * clamp(f, 0.0, 1.0);",
"      float edge = smoothstep(-0.1, 0.03, f) * (1.0 - smoothstep(0.97, 1.1, f));",
"      vec3 sp = spectrum(lam);",
"      float pulse = pulseAt(1.0 + length(uP2 - uP1) + rr);",
"      c = addLight(c, sp * edge * (zf * 2.4 + zh * 0.35) * (1.0 + pulse) / (0.6 + rr) * (0.9 + 0.25 * uGlow));",
"    }",
"  } else {",
"    float dif = max(dot(n, L), 0.0);",
"    float band = smoothstep(YB - PH, YB - PH + 0.02, p.y) * (1.0 - smoothstep(YB - 0.012, YB, p.y));",
"    c = baseD * (0.30 + 0.62 * dif) * mix(0.82, 1.0, band);",
"    c += mix(vec3(0.20), vec3(0.10, 0.08, 0.16), uNight) * pow(max(dot(reflect(-L, n), V), 0.0), 12.0);",
"    c *= 1.0 - 0.25 * smoothstep(YB - 0.03, YB - PH, p.y);",
"  }",
"  return c;",
"}",
"vec3 outside(vec3 ro, vec3 rd, out float hit) {",
"  vec3 n; float top;",
"  float t = plinthHit(ro, rd, n, top);",
"  vec3 c;",
"  hit = 0.0;",
"  if (t < 1e8) { c = plinthShade(ro + rd * t, n, top, rd, t); hit = 1.0; }",
"  else c = env(rd);",
"  c = addLight(c, beamGlow(ro, rd, min(t, 50.0)) + fanLight(ro, rd, min(t, 50.0)));",
"  return c;",
"}",
"vec3 glassAt(vec3 ro, vec3 rd, float tn, vec3 nn) {",
"  vec3 p = ro + rd * tn;",
"  vec3 n = bevel(p, nn);",
"  float ci = clamp(-dot(rd, n), 0.0, 1.0);",
"  float F = 0.04 + 0.96 * pow(1.0 - ci, 5.0);",
"  float hr;",
"  vec3 rr = reflect(rd, n);",
"  vec3 refl = env(rr);",
"  vec3 pn; float pt;",
"  pt = plinthHit(p + n * 1e-3, rr, pn, hr);",
"  if (pt < 1e8) refl = plinthShade(p + rr * pt, pn, hr, rr, pt);",
"  vec3 col = vec3(0.0);",
"  for (int k = 0; k < 3; k++) {",
"    float ior = k == 0 ? 1.505 : (k == 1 ? 1.522 : 1.545);",
"    vec3 d1 = refract(rd, n, 1.0 / ior);",
"    vec3 m; float te = prismExit(p, d1, m);",
"    vec3 pe = p + d1 * te;",
"    vec3 me = bevel(pe, m);",
"    float len = te;",
"    vec2 ib = segClose(p, d1, uP1, uP2, te);",
"    float inner = exp(-ib.x * ib.x / 0.0002) * 1.3 + exp(-ib.x / 0.04) * 0.3 + exp(-ib.x / 0.22) * 0.10;",
"    inner *= 1.0 + pulseAt(1.0 + ib.y * length(uP2 - uP1));",
"    vec3 d2 = refract(d1, -me, ior);",
"    if (dot(d2, d2) < 1e-4) {",
"      vec3 d1b = reflect(d1, -me);",
"      vec3 m2; float t2 = prismExit(pe + d1b * 1e-3, d1b, m2);",
"      vec3 pe2 = pe + d1b * t2;",
"      len += t2;",
"      vec3 me2 = bevel(pe2, m2);",
"      d2 = refract(d1b, -me2, ior);",
"      if (dot(d2, d2) < 1e-4) d2 = reflect(d1b, -me2);",
"      pe = pe2;",
"    }",
"    float h;",
"    vec3 bg = outside(pe + d2 * 1e-3, d2, h);",
"    vec3 absorb = exp(-len * mix(vec3(0.10, 0.16, 0.05), vec3(0.14, 0.24, 0.07), uNight));",
"    vec3 c = addLight(bg * absorb, beamTint() * inner);",
"    if (k == 0) col.r = c.r; else if (k == 1) col.g = c.g; else col.b = c.b;",
"  }",
"  return col * (1.0 - F) + refl * F;",
"}",
"void main() {",
"  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;",
"  vec3 rd = normalize(uCF + (uv.x * uCR + uv.y * uCU) * 2.0 * uFov);",
"  vec3 ro = uCam;",
"  float tn; vec3 nn;",
"  vec3 c; float a;",
"  if (prismHit(ro, rd, tn, nn)) {",
"    c = glassAt(ro, rd, tn, nn); a = 1.0;",
"    c = addLight(c, beamGlow(ro, rd, tn) * 0.5);",
"  } else {",
"    vec3 n; float top;",
"    float t = plinthHit(ro, rd, n, top);",
"    if (t < 1e8) { c = plinthShade(ro + rd * t, n, top, rd, t); a = 1.0; }",
"    else { c = vec3(0.0); a = 0.0; }",
"    vec3 gl = beamGlow(ro, rd, min(t, 50.0)) + fanLight(ro, rd, min(t, 50.0));",
"    if (a < 0.5) {",
"      if (uNight > 0.5) { vec3 m = 1.0 - exp(-gl * 1.1); vec3 o = sqrt(m); float al = max(max(o.r, o.g), o.b); gl_FragColor = vec4(o, al); }",
"      else { float I = max(max(gl.r, gl.g), gl.b); vec3 hue = gl / max(I, 1e-4); float al = 1.0 - exp(-I * 1.5); gl_FragColor = vec4(sqrt(clamp(hue * 0.86, 0.0, 1.0)) * al, al); }",
"      return;",
"    }",
"    c = addLight(c, gl);",
"  }",
"  c = 1.0 - exp(-c * mix(1.75, 1.45, uNight));",
"  gl_FragColor = vec4(sqrt(c) * a, a);",
"}"].join("\n");
var VS="attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}";
var GL={gl:null,u:{},failed:false,lost:false};
function glInit(cv){if(GL.gl||GL.failed)return !!GL.gl;try{var gl=cv.getContext("webgl",{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false})||cv.getContext("experimental-webgl");
    if(!gl){GL.failed=true;return false;}
    function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o;}
    var pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));
    gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
    var loc=gl.getAttribLocation(pr,"p");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    ["uRes","uCam","uCR","uCU","uCF","uFov","uNight","uT","uS","uP1","uP2","uFan","uPulse","uGlow","uBg0","uBg1"].forEach(function(n){GL.u[n]=gl.getUniformLocation(pr,n);});
    GL.gl=gl;return true;}catch(e){GL.failed=true;GL.err=String(e&&e.message||e).slice(0,300);return false;}}
function lin(h){return [1,3,5].map(function(i){var v=parseInt(h.substr(i,2),16)/255;return v*v;});}
var BG={day:[lin("#fdfcff"),lin("#efe9f8")],night:[lin("#1d1529"),lin("#120c1b")]};
function size(){var d=Math.min(2,Math.max(1,H.dpr()))*B.q,w=Math.round(B.W*d),h=Math.round(B.H*d),cv=B.cv;if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}return d;}
function view(){var T=B.t,amp=B.amp,ph=T/PERIOD*TAU;
  return camera(BASE_YAW+amp*0.14*Math.sin(ph)+B.ly.x,BASE_PITCH+amp*0.03*Math.cos(ph)+B.lp.x+B.kn.x*0.02,DIST*(1+B.kn.x*0.03));}
function draw(){if(!B.cv)return;var c=view(),n=H.night(),drift=1.6*Math.sin(B.t/PERIOD*TAU+Math.PI/2)*B.amp;B.path=path(drift);B.cam=c;var P=B.path;
  if(GL.gl&&!GL.lost){var gl=GL.gl,u=GL.u;size();gl.viewport(0,0,B.cv.width,B.cv.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u.uRes,B.cv.width,B.cv.height);gl.uniform3fv(u.uCam,c.pos);gl.uniform3fv(u.uCR,c.R);gl.uniform3fv(u.uCU,c.U);gl.uniform3fv(u.uCF,c.F);gl.uniform1f(u.uFov,c.fov);
    gl.uniform1f(u.uNight,n?1:0);gl.uniform1f(u.uT,B.t/1000);gl.uniform3f(u.uS,P.S[0],P.S[1],0);gl.uniform3f(u.uP1,P.P1[0],P.P1[1],0);gl.uniform3f(u.uP2,P.P2[0],P.P2[1],0);
    gl.uniform2f(u.uFan,P.red,P.violet);gl.uniform1f(u.uPulse,B.flare>0?1-B.flare:-1);gl.uniform1f(u.uGlow,B.lift);
    var bg=n?BG.night:BG.day;gl.uniform3fv(u.uBg0,bg[0]);gl.uniform3fv(u.uBg1,bg[1]);gl.drawArrays(gl.TRIANGLES,0,3);}
  else flat(c,P,n);}
/* where there is no WebGL: the plinth, the glass and the light, drawn simply and still */
function flat(c,P,n){var cv=B.cv,g=cv.__g||(cv.__g=cv.getContext("2d"));if(!g)return;var d=size();g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,B.W,B.H);
  var i,pts=[];for(i=0;i<=48;i++){var a=i/48*TAU;pts.push(project(c,[1.72*Math.cos(a),YB,1.72*Math.sin(a)]));}
  g.beginPath();pts.forEach(function(p,j){if(j)g.lineTo(p[0],p[1]);else g.moveTo(p[0],p[1]);});g.closePath();g.fillStyle=n?"#241c34":"#e9e3f5";g.fill();g.strokeStyle=n?"rgba(205,184,240,.25)":"rgba(106,63,181,.25)";g.stroke();
  var s0=project(c,[P.S[0],P.S[1],0]),p1=project(c,[P.P1[0],P.P1[1],0]),p2=project(c,[P.P2[0],P.P2[1],0]);
  g.lineCap="round";g.strokeStyle=n?"rgba(255,255,255,.9)":"rgba(106,63,181,.8)";g.lineWidth=2;g.beginPath();g.moveTo(s0[0],s0[1]);g.lineTo(p1[0],p1[1]);g.lineTo(p2[0],p2[1]);g.stroke();
  var cols=["#ff3b30","#ff9f0a","#ffd60a","#34c759","#30b0c7","#5856d6","#8e44ad"];cols.forEach(function(col,k){var a=P.red+(P.violet-P.red)*k/6,q=project(c,[P.P2[0]+Math.cos(a)*1.1,P.P2[1]+Math.sin(a)*1.1,0]);
    g.strokeStyle=col;g.globalAlpha=.75;g.lineWidth=2;g.beginPath();g.moveTo(p2[0],p2[1]);g.lineTo(q[0],q[1]);g.stroke();});g.globalAlpha=1;
  var V=[[PX-HA,YB],[PX+HA,YB],[PX,YB+HA*2*0.8660254]];[-0.52,0.52].forEach(function(z){var f=V.map(function(v){return project(c,[v[0],v[1],z]);});g.beginPath();f.forEach(function(p,j){if(j)g.lineTo(p[0],p[1]);else g.moveTo(p[0],p[1]);});g.closePath();
    g.fillStyle=n?"rgba(205,184,240,.10)":"rgba(106,63,181,.08)";g.fill();g.strokeStyle=n?"rgba(230,220,255,.55)":"rgba(106,63,181,.45)";g.lineWidth=1.2;g.stroke();});}
/* the press button lies over the glass as it stands at rest */
function placeHit(){if(!B.hit)return;var c=camera(BASE_YAW,BASE_PITCH,DIST),xs=[],ys=[];[[PX-HA,YB],[PX+HA,YB],[PX,YB+HA*2*0.8660254]].forEach(function(v){[-0.52,0.52].forEach(function(z){var p=project(c,[v[0],v[1],z]);xs.push(p[0]);ys.push(p[1]);});});
  var l=Math.min.apply(null,xs)-8,t=Math.min.apply(null,ys)-8,r=Math.max.apply(null,xs)+8,b=Math.max.apply(null,ys)+8,s=B.hit.style;
  s.left=Math.round(l)+"px";s.top=Math.round(t)+"px";s.width=Math.round(r-l)+"px";s.height=Math.round(b-t)+"px";}
/* ---------- movement: one period, a lean on springs, a knock and a pulse of light ---------- */
function step(dt){if(H.still()){B.flare=0;B.lift=B.hover?1:0;B.amp=0;B.ly.x=0;B.lp.x=0;B.kn.x=0;draw();return false;}
  var goal=B.hold?.4:1;B.amp+=(goal-B.amp)*Math.min(1,dt/500);B.t+=dt*(H.motion()==="full"?1.3:1);
  B.ly.to(B.tx*0.30,dt);B.lp.to(B.ty*0.07,dt);B.kn.to(0,dt);
  if(B.flare>0)B.flare=Math.max(0,B.flare-dt/1100);var lg=B.hover?1:0;B.lift+=(lg-B.lift)*Math.min(1,dt/140);
  /* if the computer cannot keep up, draw fewer pixels; if it has room again, more */
  if(dt>30){B.slow++;B.fast=0;if(B.slow>40&&B.q>0.62){B.q=Math.max(0.62,B.q-0.12);B.slow=0;}}else if(dt<19){B.fast++;B.slow=0;if(B.fast>240&&B.q<1){B.q=Math.min(1,B.q+0.12);B.fast=0;}}
  draw();return true;}
function run(){var C=B.C;if(!C||!C.shown){if(B.loop)B.loop.stop();return;}if(H.still()){if(B.loop)B.loop.stop();draw();return;}if(!B.loop)B.loop=H.Loop(step);B.loop.start();}
function lines(){var e=$("codeEditor");var v=e?String(e.value||""):"";return v?v.split("\n").length:0;}
function paint(){var C=B.C;if(!C||!C.on)return;var n=lines(),auto=$("autoRun");C.tagSet(n?n+(n===1?" line":" lines"):"An empty page",auto&&auto.checked?"runs as you type":"runs when you press Run");}
function runPage(){var r=$("runBtn");if(!H.still()){B.flare=1;B.kn.v=-9;}run();setTimeout(function(){if(r)r.click();if(B.C)B.C.toRoom("#buildGrid");},H.still()?0:280);}
function sample(){var s=$("sampleBtn");if(s)s.click();if(B.C)B.C.toRoom("#buildGrid");}
function start(){H=W.IngHeads;if(!H||!$("page-build")){if((B.tries=(B.tries||0)+1)<240)setTimeout(start,500);return;}B.ly=H.Spring(60,11);B.lp=H.Spring(60,11);B.kn=H.Spring(300,12);
  B.C=H.mount({page:"page-build",label:"Build",eyebrow:"Build · the prism of your page",cls:"hd-build",
    keys:[{name:"run",id:"hdBuildRun",text:"Run your page",icon:"run",primary:true,click:runPage},{name:"sample",id:"hdBuildSample",text:"Load a sample",icon:"open",click:sample}],
    line:"Your code on one side, your page running on the other: try an idea, check a snippet, or let a model help you fix it.",
    scene:function(C){B.cv=mk("canvas","hd-cv pr-gl");B.cv.setAttribute("aria-hidden","true");C.box.appendChild(B.cv);size();glInit(B.cv);
      B.cv.addEventListener("webglcontextlost",function(e){e.preventDefault();GL.lost=true;});B.cv.addEventListener("webglcontextrestored",function(){GL.gl=null;GL.failed=false;GL.lost=false;glInit(B.cv);draw();});
      var hit=mk("button","hd-hit hd-key");hit.type="button";hit.id="hdBuildPrism";hit.setAttribute("aria-label","Run your page");C.box.appendChild(hit);B.hit=hit;placeHit();
      hit.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hover=true;run();}});hit.addEventListener("pointerleave",function(){B.hover=false;B.down=false;run();});
      hit.addEventListener("pointerdown",function(){B.down=true;run();});["pointerup","pointercancel"].forEach(function(t){hit.addEventListener(t,function(){B.down=false;run();});});
      hit.addEventListener("click",function(e){e.preventDefault();runPage();});hit.addEventListener("focus",function(){B.hold=true;run();});hit.addEventListener("blur",function(){B.hold=false;run();});
      C.scene.addEventListener("pointerenter",function(e){if(e.pointerType!=="touch"){B.hold=true;run();}});
      C.scene.addEventListener("pointermove",function(e){if(e.pointerType==="touch")return;var r=C.box.getBoundingClientRect();if(!r.width)return;
        B.tx=Math.max(-1,Math.min(1,(e.clientX-(r.left+r.width*.45))/(r.width*.45)));B.ty=Math.max(-1,Math.min(1,(e.clientY-(r.top+r.height*.5))/(r.height*.5)));},{passive:true});
      C.scene.addEventListener("pointerleave",function(){B.tx=0;B.ty=0;if(D.activeElement!==hit){B.hold=false;run();}});
      C.hintSet(["Point at the prism and it turns to you; press it to run your page."]);},
    paint:function(){paint();draw();},theme:function(){draw();run();},shown:function(C,sh){if(sh){paint();draw();}run();},resize:function(){draw();}});
  var ed=$("codeEditor");if(ed)ed.addEventListener("input",function(){clearTimeout(B.q2);B.q2=setTimeout(paint,400);});var au=$("autoRun");if(au)au.addEventListener("change",paint);}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
W.IngHeads&&(W.IngHeads.build={state:function(){var C=B.C;return {on:!!(C&&C.on),running:!!(B.loop&&B.loop.running()),webgl:!!(GL.gl&&!GL.lost),err:GL.err||"",q:B.q,flare:B.flare,
  path:B.path?{P1:B.path.P1,P2:B.path.P2,red:B.path.red,violet:B.path.violet}:null,tag:C&&C.tagB?[C.tagB.textContent,C.tagS.textContent]:null};},draw:draw});
try{window.__ingParts["p289"]="running";}catch(_){}
})();
</script>
