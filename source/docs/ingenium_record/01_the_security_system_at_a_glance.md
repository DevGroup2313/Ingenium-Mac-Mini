# Ingenium record 01 · The security system at a glance

Part of the record, written from Ingenium 7.54's sources (20 November 2026).

## 1. What is protected, and from whom

* **Her work at rest on her devices**, from anyone who holds a device but not her password: with the sign-in on, everything Ingenium keeps for her is sealed (records 02 and 05), on the computer's disk too (record 06, section 3).
* **Each person's work from the others on one device**: each profile has its own stores, its own sign-in and its own data key (record 04).
* **Her work in transit between her devices**: sealed end to end once they are paired (record 06, section 4); Ingenium Cloud keeps only sealed parts (record 06, section 5).
* **Plain copies leaving the device**: Ask before each export (record 06, section 2); backups sealed whole while the sign-in is on.
* **Her ownership of her apps**: the licence, her owner keys and her permissions (record 06, section 6); the editions carry nothing of hers (record 06, section 8).

## 2. What it does not protect against (said plainly)

* Anyone at the device while it is open and signed in. Lock now, Sign out, the lock after time away and the lock when the computer sleeps close that window of time.
* Anyone who can sign in to her computer as her, if she turned on the computer's own sign-in as a way back in (said when it is turned on).
* Anyone who holds her password, her ten words, or her recovery key file with the device.
* Malicious software already on the device, or a browser extension that reads pages.
* Model files, the engine, the training lab's models and Fabrica's finds by meaning, which are not sealed; a run's working files while the run is still running.
* Not yet built: signed packages, scrambled code, Ingenium itself signed and checked, the folder search's index and apps kept on a drive sealed (record 06, section 7).

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
| Sealed on the computer's disk | `build/modules/r340.js`, `build/desktop/app_disk_749.py`, `app_disk_750.py` | 06 |
| Sealed between devices | `build/modules/r319.js`, `build/desktop/app_seal_737.py` | 06 |
| Ingenium Cloud | `build/modules/r255.js`, `build/desktop/app_cloud_657.py` | 06 |
| Ownership, licence, permissions | `build/modules/r162.js`, `build/thoughts/permit_core.html`, `security/permits.py`, `security/owner_keys.json` | 06 |
| The editions | `build/editions.py` | 06 |
| The Storage page (what each store is) | `build/modules/r142.js` | 05 |
| Her ways of working | `build/modules/r327.js` | 07 |

## 5. The order of a day, as the system sees it

1. The page loads; `profiles_boot.js` points every store at the profile in use.
2. The desk is read raw. Sealed: it is kept as `__ingLockedRaw`, the page starts empty, the sign-in door is drawn in the look the desk's clear header names. Signed out: the profiles door comes first.
3. The right password unwraps the data key; the desk is opened and adopted; the carried documents and recordings are opened; the computer app is handed the disk key; the door goes.
4. Every save seals the desk (one sealing at a time; the last one sealed at once if the window closes).
5. Lock now, Sign out, time away or the computer's sleep: save, seal, drop the keys, tell the computer app to drop its disk key, start the page again with nothing of the session in memory.
