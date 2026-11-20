# Ingenium record 06 · The other protections

Part of the record of Ingenium's security system, written from Ingenium 7.54's sources (20 November 2026). Each section names its module in `source/build/modules/` and, for the computer apps, its patch in `source/build/desktop/`.

Her security request that most of these answer (18 November 2026): "I want you to upgrade and enhance Ingenium's security system and embedded software protection. I really want everything to be encrypted and protected ... my data is protected and also my code is protected and anything that I build inside of Ingenium with my local models and all of my current apps." Her answers then: the lock asked at first start; everything on the computer's disk sealed with the same password; messages between her devices encrypted end to end; her code signed and tamper-evident, scrambled, under an owner key and sealed in Fabrica, "and any additional features that will further protect me and encrypt Ingenium and all of its content". Her word on the live preview (source/previews/security): "I approve of the preview, please commit and push it everywhere".

## 1. Settings, Security (`r318.js`, 7.36)

A room in Settings that says how many protections are on, then each, with its true state: On, Off, or Not yet (with the release it is planned for). Nothing is ever said to be on that is not.

* **Sealed on this device**: the sign-in (record 02), its ways back in read from its record, Lock now and Sign out; the sign-in's own card stays in Settings, Your data, Sign-in and reset.
* **At first start**: a copy with no sign-in asks once, after the welcome and the tour (Protect it, which opens the sign-in's own steps; Not now). Not in the demonstration edition, and not while a test drives the page (`navigator.webdriver`), unless the test asks for it.
* **More protection** (the device's settings, localStorage `ing.security.v1`, shared by every profile; defaults `{offline:false, sleep:true, slow:true, clip:true, log:true, export:false}`):
  * Offline only (off until turned on): requests from the page to anything but this device and her home network wait, with Allow for an hour and Allow once; Ingenium's own way out (`netFetch`) follows it too.
  * Lock when the computer sleeps (on): a pause in time longer than 90 seconds locks it, as the time away does.
  * Slow down wrong passwords (on): after three, each try waits longer, 2, 4, 8 seconds and so on, up to five minutes; nothing is wiped (count in `ing.security.fails.v1`).
  * Clear a copied secret (on): a password, a recovery word or a pairing code copied from Ingenium is cleared from the clipboard after a minute, where the browser lets a page do so.
  * A record of every opening (on): when and on which device Ingenium opened, and every wrong password, kept in the desk, so sealed with it.
  * Ask before each export (off until turned on; needs the sign-in; turning it off asks for the password too): section 2.
* **Not yet**, said so with the release planned: signed packages, scrambled code, the owner key on her apps, Ingenium itself signed and checked.
* `window.IngSecurity` gives the others `cfg()` (the switches), `set(key, value)`, `view()` (which part of the room is shown), `paint()`, `log()` (the record of every opening, kept in the desk as `state.secLog`) and the Offline only helpers (`net`, `allowed(url)`, `allow`).

## 2. Ask before each export (`r341.js`, 7.51)

* Every file Ingenium saves out of itself goes through `window.saveFileNative` (the base's own, queued one at a time by r137); this part stands in front of it.
* With the switch on and the sign-in on, a file that leaves unsealed waits for the password (`IngLock.confirm`, record 02 section 6.3): the right password lets it go; Cancel, Escape or the page locking keeps it here, and says so.
* What is sealed already leaves without the question: a backup sealed whole (it begins `INGENIUM SEALED BACKUP 1`), and the recovery key file, which the sign-in saves only after the password has just been asked.
* Files asked for while the question is open share its one answer; the next export asks again.
* `window.IngExportAsk`: `on()`, `sealed(data)`.

## 3. Sealed on the computer's disk (`r340.js` and `desktop/app_disk_749.py`, `app_disk_750.py`; 7.49 and 7.50)

* While the owner is signed in, the computer app is handed the disk key (`IngLock.diskKey()`: derived from the data key with HKDF-SHA-256, info `"ingenium-disk 1"`; never the password and never the data key itself) and keeps it in memory only (`disk_key_hold`). When Ingenium locks it is dropped (`disk_key_drop`); a page opened locked drops it too, so a refresh never leaves it behind.
* Sealed with it: the apps waiting for her devices and Fabrica's runs, their logs and files, in 1 MiB AES-256-GCM chunks (7.49); the records of waiting apps under names that say nothing, a run's record once it ends, and texts for training (7.50). A run still runs on plain files while it runs; its files are sealed when it ends.
* When the sign-in is turned off, everything sealed on the disk is opened again first (`disk_unseal_all`).
* Settings, Security, The computer's disk says what is sealed and what is not yet, with Seal them now; it repeats only what the computer app itself reports it seals (`disk_status`), so an older app is never said to seal more than it does.
* `window.IngDiskSeal`: `state()`, `describe(hasFabrica)`, `status()`, `sealNow()`.

## 4. Sealed between her devices (`r319.js` and `desktop/app_seal_737.py`, 7.37)

Her answer: "Yes, encrypt them". When a device pairs with a computer that seals (its hello says `seal: 1`):

* the device makes a key pair of its own (ECDH P-256; the private half never leaves the browser's store, `ingenium_seal`), sends its public half with the pairing code, and both screens show the same four words (32 bits, from both public keys); she confirms them on the computer;
* the two then hold a shared key (HKDF-SHA-256, AES-GCM 256-bit) that was never sent;
* from then on every request this device makes to that computer (models, the Cloud, runs, apps) goes sealed through `/ingenium/sealed`, without the code, and every byte of the answer comes back sealed, streams included.

## 5. Ingenium Cloud (`r255.js` and `desktop/app_cloud_657.py`, 6.57)

* A computer at home can be the hub; any Mac or Windows app can keep the Cloud for others, behind its pairing code; phones, tablets and browsers connect to a computer that keeps it. Over Wi-Fi; Bluetooth is not used, since a web page cannot exchange data over it.
* What travels: what a backup holds, except what belongs to one device (its models, the computer it borrows models from, its window, its dictation, its app library, and its keys).
* Sealed: each part is sealed on the device with AES-GCM-256 under a key drawn from her Cloud passphrase (ten characters or more; PBKDF2-SHA-256, 600,000 rounds; the salt travels with each snapshot, so a joining device draws the same key), with additional data `"ingenium-cloud 1 " + id`, and named by a keyed fingerprint (HMAC-SHA-256). The same part always seals the same way, so only parts that changed travel, and the computer that keeps the Cloud holds only sealed parts it cannot read. The key is kept in `ingenium_cloudkey` as a key the page cannot read out, and never goes into a backup.
* Bringing work in merges as Backup's Merge does (each item by its own date; the newer wins), keeping the desk as it was on the recovery shelf first.
* Away from home: a sync file, sealed with the same passphrase.

## 6. Ownership, licence and permissions (`r162.js`, `thoughts/permit_core.html`, `security/permits.py`; 6.2)

Her words: "The app is my sole original work and only I am able to do distribute, sell, edit, remove or basically do anything with it, no one else has that right and should not ever have access unless I grant them limited persmission that I can discontinue at any time. I want that made explicit for all of my apps."

* PermitCore is shared by Ingenium and The Forge (the same file). A card in Settings shows the licence (`licence/LICENCE_ingenium.txt`, version 2) whole, the copy's edition and build, the permissions kept on the device, and in the master edition the owner's key and the permissions given and withdrawn.
* Signatures are ECDSA P-256 with SHA-256 (WebCrypto). Only the public halves of the owner's keys are in the repositories (`security/owner_keys.json`); `build_page.py` writes them in through `security/permits.py`, with the owner's latest list of withdrawn permissions and, for a copy made for one person, the permission it is given with.
* Terms and privacy (`r320.js`, 7.37): a card beside the licence: In short, the Privacy notice, the Terms of use, and in the master edition Your contact; a first draft, marked Draft in the master edition, for a lawyer in the US and the UK to read before it is final.
* The Android signing keys: no page carries one; the builds take them from each repository's secrets (`security/KEYS.md`).

## 7. Approved and not yet built (as of 7.54)

* The folder search's index sealed (approved 20 November 2026, at the cost measured on a prototype: building about three times as long; the first vector search of a session about 3.5 s, later ones 37 to 74 ms with a cache of opened sectors in the worker's memory). The prototype: each 4 KiB sector of the index's file sealed with XChaCha20-Poly1305 (`@noble/ciphers` 2.4.0), the sector's number and the file's salt bound in; its key from the data key (HKDF, info `"ingenium-rag 1"`).
* Fabrica's apps kept on a drive, sealed (approved): only the repositories Ingenium writes itself; any other folder only at the owner's choice, one at a time; with Export a plain copy.
* From the Security preview: Your apps signed when shipped, Your apps' code scrambled, and Ingenium itself signed and checked (this last needs her decision on where the owner key signs each release).

## 8. The editions carry nothing of hers

The full, gift and demo editions are built from the same sources by `build/editions.py`. Every edition but the master leaves out her own modules (`skip_modules`: Lector's recipe, the Workshop, the Author Studio, Troubleshoot, the Offline Project, her demonstrations, her build library, Ingenium's own rules in its folder, her plans in Vocatio, this record (`r345.js`), the Desk's five apps outside the master), takes out her ways of working (`var HERS=[];`) and her later rules (`var LATER=[];`), and must find each exactly once or the build stops. `rig/t_745_owner_free.js` reads the whole text of each edition for anything of hers.
