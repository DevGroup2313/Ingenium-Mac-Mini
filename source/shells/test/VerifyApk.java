// INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
// java -cp apksig.jar:. VerifyApk <apk> <minSdk>  -- Google's own verifier (apksig) on an APK Fabrica made
import com.android.apksig.ApkVerifier;
import java.io.File;
import java.security.MessageDigest;
public class VerifyApk {
  public static void main(String[] a) throws Exception {
    ApkVerifier v = new ApkVerifier.Builder(new File(a[0])).setMinCheckedPlatformVersion(Integer.parseInt(a[1])).build();
    ApkVerifier.Result r = v.verify();
    System.out.println("verified=" + r.isVerified() + " v1=" + r.isVerifiedUsingV1Scheme() + " v2=" + r.isVerifiedUsingV2Scheme());
    for (ApkVerifier.IssueWithParams e : r.getErrors()) System.out.println("ERROR " + e);
    for (ApkVerifier.IssueWithParams w : r.getWarnings()) System.out.println("WARNING " + w);
    for (ApkVerifier.Result.V1SchemeSignerInfo s : r.getV1SchemeSigners()) { for (Object e : s.getErrors()) System.out.println("V1 ERROR " + e); }
    for (ApkVerifier.Result.V2SchemeSignerInfo s : r.getV2SchemeSigners()) { for (Object e : s.getErrors()) System.out.println("V2 ERROR " + e); }
    for (java.security.cert.X509Certificate c : r.getSignerCertificates()) {
      byte[] d = MessageDigest.getInstance("SHA-256").digest(c.getEncoded()); StringBuilder h = new StringBuilder(); for (byte b : d) h.append(String.format("%02x", b));
      System.out.println("signer " + c.getSubjectX500Principal() + " sha256=" + h);
    }
    System.exit(r.isVerified() ? 0 : 1);
  }
}
