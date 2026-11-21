/* INGENIUM | Copyright (c) 2026 Yannie D. Forest. All rights reserved. NO LICENCE IS GRANTED.
   The Android shell's check of its page (SignatureCheck.java), run on a computer against the cases of vectors.json
   (make_vectors.mjs), with the two test keys they were made with: each answer must be the one the case names.
     javac -d <out> source/shells/android/src/studio/ingenium/shell/SignatureCheck.java source/shells/common/test/CheckTest.java
     java -cp <out> studio.ingenium.shell.CheckTest source/shells/common/test/vectors.json */
package studio.ingenium.shell;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Map;

public final class CheckTest {
    public static void main(String[] args) throws Exception {
        Charset utf8 = Charset.forName("UTF-8");
        Map<?, ?> v = (Map<?, ?>) new SignatureCheck.Json(new String(Files.readAllBytes(Paths.get(args[0])), utf8)).whole();
        List<?> ks = (List<?>) v.get("keys");
        String[][] keys = new String[ks.size()][];
        for (int i = 0; i < ks.size(); i++) { List<?> k = (List<?>) ks.get(i); keys[i] = new String[]{(String) k.get(0), (String) k.get(1), (String) k.get(2)}; }
        int pass = 0, fail = 0;
        for (Object o : (List<?>) v.get("cases")) {
            Map<?, ?> c = (Map<?, ?>) o;
            ByteArrayOutputStream page = new ByteArrayOutputStream();
            for (Object p : (List<?>) c.get("parts")) {
                Map<?, ?> part = (Map<?, ?>) p;
                if (part.get("b64") != null) page.write(Base64.getDecoder().decode((String) part.get("b64")));
                else { byte[] r = ((String) part.get("rep")).getBytes(utf8); long n = ((Double) part.get("count")).longValue(); for (long k = 0; k < n; k++) page.write(r); }
            }
            Object want = c.get("want");
            String got = SignatureCheck.check(new ByteArrayInputStream(page.toByteArray()), Boolean.TRUE.equals(c.get("marked")), (String) c.get("kid"), (String) c.get("app"), keys);
            boolean ok = want == SignatureCheck.Json.NULL ? got == null : want.equals(got);
            if (ok) pass++; else fail++;
            System.out.println((ok ? "PASS " : "FAIL ") + c.get("name") + ": " + (got == null ? "opens" : "It " + got + ".") + (ok ? "" : "  (wanted: " + (want == SignatureCheck.Json.NULL ? "opens" : "It " + want + ".") + ")"));
        }
        System.out.println(pass + " passed, " + fail + " failed, of " + (pass + fail));
        System.exit(fail == 0 && pass > 0 ? 0 : 1);
    }
}
