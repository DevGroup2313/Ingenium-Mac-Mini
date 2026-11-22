# Ingenium record 01 · The security system at a glance

Part of the record, written from Ingenium 7.54's sources and brought up to 7.69 (22 November 2026).

## 1. What is protected, and from whom

* **Her work at rest on her devices**, from anyone who holds a device but not her password: with the sign-in on, everything Ingenium keeps for her is sealed (records 02 and 05), on the computer's disk too (record 06, section 3).
* **Each person's work from the others on one device**: each profile has its own stores, its own sign-in and its own data key (record 04).
* **Her work in transit between her devices**: sealed end to end once they are paired (record 06, section 4); Ingenium Cloud keeps only sealed parts (record 06, section 5).
* **Plain copies leaving the device**: Ask before each export (record 06, section 2); backups sealed whole while the sign-in is on.
* **Ingenium itself, on her computers**: from 7.58 each release can be signed with her owner key on her own device, and the Mac and Windows apps check the page against her signature at every start, before anything of it runs: a changed copy does not open and says which file changed (record 06, section 9).
* **Her ownership of her apps**: the licence, her owner keys and her permissions (record 06, section 6); the editions carry nothing of hers (record 06, section 8).
* **Ingenium itself, on her phones and tablets** (7.64): the iPhone, iPad and Fire apps check their copy against her signature at every start too; Sign this release signs both copies, Save the signature saves one file for every device, and Sign a copy you give signs the full or gift edition she gives (record 06, section 13).
* **Her apps' code, from being read or copied easily** (7.67): every package Fabrica makes carries the app's code shrunk and the names inside it scrambled, and the pages it carries inside too, before it is signed; her sources in Fabrica stay as she wrote them, and Ingenium itself is never scrambled (record 06, section 14).
* **Her code, readable to her** (7.68): her sources in Fabrica stay as she wrote them, a scrambled copy of one of her apps that comes back to her opens as written from Fabrica, and her reading key is made for the release that scrambles every copy of Ingenium and opens it for her as written (record 06, section 15).
* **Ingenium, from the apps she runs in its preview** (7.69): each runs in a sandboxed frame with no origin of its own and never reaches Ingenium's stores; the stage kit gives it stores of its own, and what it keeps is kept for it, sealed, and handed back only to it (record 06, section 16).
* **An app meant for her alone** (7.63): turned on in its Package details, every package of it opens only where she opened it once with her owner key, or for someone she gave a permission to use it (record 06, section 12).
* **Ingenium itself, from being changed by anyone else**: the Mac and Windows apps check the page against her signature at every start, and a changed copy does not open (record 06, section 9).
* **What the device shares, from anyone who opens the practice studio**: it opens without a password, so it reads the device's models, protection and pairing but can change none of them (record 04, section 9).

## 2. What it does not protect against (said plainly)

* The keys an app in the preview made (7.69): kept as the browser keeps keys, usable on this device and never readable as bytes, but not sealed with the sign-in; what the app keeps besides is sealed (record 06, section 16).
* Anyone at the device while it is open and signed in. Lock now, Sign out, the lock after time away and the lock when the computer sleeps close that window of time.
* Anyone who can sign in to her computer as her, if she turned on the computer's own sign-in as a way back in (said when it is turned on).
* Anyone who holds her password, her ten words, or her recovery key file with the device.
* Malicious software already on the device, or a browser extension that reads pages.
* Model files, the engine, the training lab's models and Fabrica's finds by meaning, which are not sealed; a run's working files while the run is still running.
* Anyone who can change the computer app itself, or take its signatures away, can stop the check of Ingenium itself (it then says Not signed yet); so can someone who changes an iPhone, iPad or Fire app itself (each checks its own copy from 7.64).
* Not yet built: the check at start of an app built from its build kit, and apps kept on a drive sealed (record 06, section 7). Her apps' code is scrambled from 7.67 (record 06, section 14): much slower to read or copy, never impossible, and the names a page shares and the data it carries stay readable. The folder search's index is sealed from 7.59 (record 06, section 10); her apps are signed when shipped from 7.60 (the packages Fabrica makes carry her owner key's signature), and from 7.62 each app Fabrica makes checks it at every start, and an app is checked as it comes into her library (record 06, section 11).
* An app made to open only with her owner key (record 06, section 12) opened straight from its file in a browser, which does not check it, or taken apart on a device where it is open. A permission she withdraws closes only the copies made after it, which carry her newer list.
* Anyone who opens the browser's own tools at an unlocked device: profiles and the practice studio are kept apart by the app, not by the browser, so every store can be read raw there. What keeps her work closed is the seal, which only her password or a way back in opens.

There is no maker's key and no back door. A copy opens only with what its owner keeps, so a forgotten password with no way back in cannot be undone by anyone.

## 3. The keys, in one picture

```
password ──PBKDF2-SHA-256 (≥600,000 rounds)──► key ──AES-GCM unwraps──┐
ten words ─PBKDF2-SHA-256 (same rounds)──────► key ──AES-GCM unwraps──┤
recovery key file (256-bit key) ────────────────────── AES-GCM unwraps─┼──► the data key (32 random bytes)
the computer's own sign-in (keychain, DPAPI) ───────── AES-GCM unwraps─┘          │
                                                                                   ├─ AES-GCM-256 seals: the desk, long texts,
                                                                                   │  records, bytes, carried documents, recordings
                                                                                   └─ HKDF-SHA-256 "ingenium-disk 1" ──► the disk key
                                                                                      (held by the computer app in memory only)
```

Each profile has its own record and its own data key. The Cloud has its own key, from its own passphrase; pairing between devices has its own key pair and shared key.

## 4. The parts and where they are

| Part | Module or file | Record |
|---|---|---|
| Profiles' stores kept apart | `build/boot/profiles_boot.js` | 04 |
| Sign-in, keys, seal, Lock now, ways back in | `build/modules/r197.js` | 02 |
| Profiles: list, door, Settings card | `build/modules/r331.js` | 04 |
| Profiles in the Status panel | `build/modules/r338.js` | 04 |
| Another person's profile | `build/modules/r336.js`, `build/build_page.py` (`_OWNER_ONLY`) | 04 |
| Sign out | `build/modules/r344.js` | 03 |
| Settings, Security; More protection | `build/modules/r318.js` | 06 |
| Ask before each export | `build/modules/r341.js` | 06 |
| Sealed on the computer's disk | `build/modules/r340.js`, `build/desktop/app_disk_749.py`, `app_disk_750.py`, `app_disk_fix_757.py` | 06 |
| Sealed between devices | `build/modules/r319.js`, `build/desktop/app_seal_737.py` | 06 |
| Ingenium Cloud | `build/modules/r255.js`, `build/desktop/app_cloud_657.py` | 06 |
| Ownership, licence, permissions | `build/modules/r162.js`, `build/thoughts/permit_core.html`, `security/permits.py`, `security/owner_keys.json` | 06 |
| Opens only with your owner key (the door at the head of each package's page) | `build/modules/r354.js` | 06 |
| Ingenium itself, signed and checked | `build/modules/r348.js`, `build/desktop/app_self_758.py`, `tools/stamp_build.py`, `build/release.py` (`self_stamp`) | 06 |
| The practice studio | `build/modules/r350.js`, its part in `build/boot/profiles_boot.js` | 04 |
| What an app in the preview keeps (the stage kit) | `build/modules/r358.js`, `build/stagekit/` | 06 |
| Purple words that can be pressed, underlined | `build/modules/r343.js` | 07 |
| See the password as it is typed (every password field) | `build/modules/r351.js` | 02 |
| The editions | `build/editions.py` | 06 |
| The Storage page (what each store is) | `build/modules/r142.js` | 05 |
| Her ways of working | `build/modules/r327.js` | 07 |

## 5. The order of a day, as the system sees it

1. The page loads; `profiles_boot.js` points every store at the profile in use.
2. The desk is read raw. Sealed: it is kept as `__ingLockedRaw`, the page starts empty, the sign-in door is drawn in the look the desk's clear header names. Signed out: the profiles door comes first.
3. The right password unwraps the data key; the desk is opened and adopted; the carried documents and recordings are opened; the computer app is handed the disk key; the door goes.
4. Every save seals the desk (one sealing at a time; the last one sealed at once if the window closes).
5. Lock now, Sign out, time away or the computer's sleep: save, seal, drop the keys, tell the computer app to drop its disk key, start the page again with nothing of the session in memory.
6. While no one is signed in, a visitor may open the practice studio from the door: the page starts again in its own stores, with sample work, and leaving it (or closing the window) takes everything of it away (record 04, section 9).
