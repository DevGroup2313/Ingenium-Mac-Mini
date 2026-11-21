/* Written by shells/common/make_common.py from security/owner_keys.json and shells/common/refused.html (Ingenium 7.62): change those, then run it; never this file. */
package studio.ingenium.shell;

final class ShellCommon {
    private ShellCommon() { }
    /** named in the built dex, so a release can tell the shell it carries was built with these keys (build_page.py) */
    static final String MARKER = "ING-SHELL-CHECK-1 CdbXeLQDHJ63NSC4cT0xnK,iej1hHjzk8YQm5BBv-52cR";
    /** the owner's public keys: their kid, and the two halves of the P-256 point, base64url */
    static final String[][] OWNER_KEYS = {
        {"CdbXeLQDHJ63NSC4cT0xnK", "p5utS3RZvzR8S_P4kuweAB7GMgpgtBWnI-8Eeb4YQBk", "83hP2W7P9SnUssIEnIyJdUipkr_DHS6SE-dnKoEgVgo"},
        {"iej1hHjzk8YQm5BBv-52cR", "jLimQPq8WiSfRge_iu7Qe7-fE-lBn7z6kfyHF7ehzco", "fwgCio0OxurUKmdZPXbMT9Hp8wXzcz4p3G5GlS7AUUA"}
    };
    /** the page shown in place of one that is not as its maker signed it ({{NAME}}, {{FILE}} and {{WHY}} filled, escaped) */
    static final String REFUSED_PAGE =
        "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>{{NAME}} did not open</title><style>:root{color-scheme:light;--bg1:"
        + "#efe8fb;--bg2:#d9ccf3;--card:#fff;--card2:#faf8fd;--ink1:#221a2e;--ink2:#4a4358;--ink3:#6c6480;--line:rgba(34,26,46,.1);--vio:#6a3fb5;--well:rgba(34,26,46,.04)}@media (prefers-color-scheme:dark){:root"
        + "{color-scheme:dark;--bg1:#1b1326;--bg2:#2a1d3d;--card:#2a2138;--card2:#241c31;--ink1:#f1ecf8;--ink2:#cfc6de;--ink3:#a69cb8;--line:rgba(255,255,255,.1);--vio:#b79ce6;--well:rgba(10,6,18,.35)}}*{box-siz"
        + "ing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px 16px;background:linear-gradient(160deg,var(--bg1),var(--bg2));color:var(--ink2);font:1"
        + "5px/1.6 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif}.card{width:min(540px,100%);background:linear-gradient(180deg,var(--card),var(--card2));border:1px solid var(--line);border-rad"
        + "ius:22px;padding:28px 30px 24px;box-shadow:0 1px 1px rgba(40,20,70,.18),0 4px 8px rgba(40,20,70,.12),0 14px 30px rgba(40,20,70,.14),0 30px 60px rgba(40,20,70,.12);animation:rise .5s cubic-bezier(.2,.8"
        + ",.2,1) both}@keyframes rise{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}.seal{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#fff"
        + ";background:radial-gradient(circle at 35% 30%,#9a74df,#6a3fb5 55%,#3a2070);box-shadow:inset 0 2px 1px rgba(255,255,255,.35),inset 0 -4px 8px rgba(20,8,40,.45),0 3px 5px rgba(40,20,70,.3),0 10px 22px r"
        + "gba(52,24,100,.28);margin-bottom:12px}.seal svg{width:30px;height:30px}.eye{font:600 11.5px/1.3 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif;letter-spacing:.16em;text-transform:upp"
        + "ercase;color:var(--vio);margin:0}h1{font:700 26px/1.25 Georgia,\"Times New Roman\",serif;color:var(--ink1);margin:6px 0 8px}p{margin:6px 0}.well{background:var(--well);border:1px solid var(--line);borde"
        + "r-radius:14px;padding:12px 16px;margin:14px 0;box-shadow:inset 0 1px 3px rgba(40,20,70,.08)}.nm{font:700 14px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ink1)}h2{font:700 15."
        + "5px/1.35 Georgia,\"Times New Roman\",serif;color:var(--ink1);margin:16px 0 2px}@media (prefers-reduced-motion:reduce){.card{animation:none}}</style></head><body><main class=\"card\" role=\"alertdialog\" ari"
        + "a-labelledby=\"h\"><div class=\"seal\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 2.8l7.5 "
        + "3v5.6c0 4.6-3.2 8.4-7.5 9.8-4.3-1.4-7.5-5.2-7.5-9.8V5.8z\"/><path d=\"M12 8v4.6\"/><path d=\"M12 16.2h.01\"/></svg></div><p class=\"eye\">Signed by its maker</p><h1 id=\"h\">{{NAME}} did not open</h1><p>It is "
        + "not as its maker signed it, so nothing of it ran.</p><div class=\"well\"><div class=\"nm\">{{FILE}}</div><p>It {{WHY}}.</p></div><h2>What to do</h2><p>Install it again from where you first got it.</p></ma"
        + "in></body></html>\n";
}
