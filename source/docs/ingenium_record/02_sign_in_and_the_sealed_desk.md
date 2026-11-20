# Ingenium record 02 · The sign-in and the sealed desk

Part of the record of Ingenium's security system, written from Ingenium 7.54's sources (20 November 2026). Every name below (a function, a store, a constant, a string) is quoted from the code; where a line says what the code does, the module that does it is named, so that it can be checked against the source in `source/build/modules/`.

## 1. What it is, in one paragraph

The sign-in is optional. It is off until the owner turns it on, and with it off nothing changes. Turned on, Ingenium asks for a user name and a password, shows a recovery phrase of ten words once, asks for two of those words back, and from then on keeps everything it holds on the device sealed: AES-GCM-256 under one random data key, which only the password (or one of the ways back in) can unwrap. The page opens to a sign-in. A wrong password changes nothing. Lock now, and the lock after time away, save first and then start the page again with nothing of the session left in memory. The keys live only in a closure inside the module for the length of the session and are never written anywhere.

The module is `build/modules/r197.js` ("R197 · A sign-in of her own, and her data sealed on the device", Ingenium 6.9.x, 31 October 2026). Her words that started it: "I also want for the data on the app to be protected with encryption so that my data is protected on the device. I also want an optional sign-in / login screen with user name and password."

## 2. The keys

### 2.1 The data key (the "dek")

* 32 random bytes from `crypto.getRandomValues` (`rnd(32)` in `makeRecord`).
* Imported for WebCrypto as `AES-GCM` with uses `encrypt` and `decrypt`, not extractable (`importDek`).
* Every sealed thing in Ingenium is sealed under this one key, or under a key derived from it (the computer's disk, section 2.4).
* The raw bytes are also kept in the closure (`K.raw`) so that a plain JavaScript AES-GCM (`jsGcm`) can seal synchronously in the instant a window hides or closes, when an asynchronous WebCrypto call would not finish.

### 2.2 The key from the password, and from the recovery phrase

* `kdf(secret, salt, iter)`: PBKDF2 with SHA-256 over the secret normalised to NFC, a 16 byte random salt, giving an AES-GCM key of 256 bits.
* The number of rounds is set once, when protection is turned on (`calibrate`): about three quarters of a second on that device, never below 600,000 and never above 2,000,000, rounded to tens of thousands.
* The recovery phrase is normalised before use (`normPhrase`): NFC, lower case, every character that is not a letter or a space taken out, single spaces.
* The password must have at least eight characters (`MIN_PW=8`). The phrase has ten words (`N_WORDS=10`) taken from a fixed list of 512 words (`WORDS`, "the first 512 and must never be reordered: her phrase is read against them").

### 2.3 The lock record (localStorage `ingenium_lock`)

The lock record holds nothing that opens anything without the password or a way back in. Its fields, as `makeRecord` writes them:

| Field | What it holds |
|---|---|
| `v` | 1 |
| `user` | the user name, up to 60 characters (not a secret; shown at the sign-in) |
| `made`, `changed` | times in milliseconds; `made` names the record, `changed` the last change |
| `idle` | minutes away before the lock locks by itself (15 at first; 0 means never) |
| `kdf` | `{name:"PBKDF2", hash:"SHA-256", iter, salt}` for the password |
| `dek` | `{iv, ct}`: the data key sealed with the password's key, additional data `"ingenium-lock dek"` |
| `rec` | `{iter, salt, iv, ct}`: the data key sealed with the phrase's key, additional data `"ingenium-lock recovery"` |
| `check` | `{iv, ct}`: the string `"ingenium-lock-check v1"` sealed with the data key, additional data `"ingenium-lock check"` |
| `phr` | `{iv, ct}`: the normalised phrase sealed with the data key, additional data `"ingenium-lock phrase"` (so it can be shown again after a sign-in) |
| `mig` | how far the sealing in place of older stores has gone (`big`, `rec`, `more`) |
| `remind` | when the next check of the ways back in is due (`next`, `step`) |
| `file` | (when made) the recovery key file's slot: `{v, id, made, iv, ct}`, the data key sealed with the file's key, additional data `"ingenium-lock file"` |
| `dev` | (when set up) the computer's own sign-in: the data key wrapped by a key the computer keeps, with the key's name and label |
| `hint` | (when written) the owner's own hint, in plain words, since it is shown before the sign-in |

Opening (`openWith(rec, secret, which)`): derive the key from the password (`which` "dek") or the phrase ("rec"), unwrap the data key, import it, and open `check`; if it does not read `"ingenium-lock-check v1"` the attempt is refused before anything else is read.

A change of password (`rewrap`) seals the same data key again under a new salt and the same number of rounds; nothing else is sealed again, because the data key does not change. The desk is written again at once so that its clear header carries the new record too.

### 2.4 Keys derived from the data key

* The computer's disk (Ingenium 7.49): `diskKey()` derives 32 bytes with HKDF-SHA-256 (salt of 32 zero bytes, info `"ingenium-disk 1"`). Its id is the first 8 bytes of its SHA-256, in hexadecimal, so that a file sealed under another sign-in is recognised as such. The computer app holds it in memory only while the owner is signed in (`modules/r340.js`, `desktop/app_disk_749.py`).
* Planned, not built: the folder search's index, with HKDF info `"ingenium-rag 1"` (see record 07).

## 3. The envelopes

Every sealed value carries the place it belongs to as AES-GCM additional data, so a sealed value moved to another place does not open there.

| Kind | Form | Additional data |
|---|---|---|
| Text | `"ING1." + base64(nonce) + "." + base64(ciphertext)`; `"ING1g."` when the text was gzipped first (texts over 1,024 bytes, `GZ_MIN`, where `CompressionStream` exists) | the caller's place name, for example `"desk"`, `"big:<id>"`, `"carried tabula_docs"` |
| A record in a store | `{ing:"sealed", v:1, k:<its key>, id:<its key>, env:"ING1…"}`; the record is packed as JSON first, byte arrays written as `{"$u8": base64}` | `"rec:" + database + "/" + store + "/" + key` |
| Bytes | `{ing:"sealed", v:2, k, id, iv, ct}`: the record packed as a small JSON head followed by its byte arrays, sealed as bytes with no base64 in between | the same place name |
| The desk | JSON with a clear header and the sealed body (section 4) | `"desk"` |

The nonce is always 12 fresh random bytes; the tag is 128 bits. `sealed(s)` recognises a sealed text by its `ING1` prefix. `sealTextSync` writes only the `"ING1."` form (no gzip), with the plain JavaScript AES-GCM.

## 4. The sealed desk

The desk is the app's whole state (`state`: chats, notes, settings, projects, the reading page's documents, Career), kept in localStorage under `ingenium_v4` (the page's `KEY`).

With the lock on, the desk is written as an envelope whose header stays clear (`deskHeader`):

```json
{"ing":"locked","v":1,"__deskAt":<when saved>,"theme":"day|night|auto",
 "look":{"theme":"…","motion":"full|calm|minimal","depth":"…"},
 "n":{"chats":<count>,"messages":<count>},
 "lock":<the lock record>,
 "body":"ING1g.…"}
```

Why the header is clear: the tab's icon, the loading page, the desk's own date stamp checks and the computer app's counts keep working while the desk is sealed, and the sign-in door can be drawn in the owner's own look (day or night) before anything opens. The lock record rides in the header too, so a desk whose browser store was lost (the computer apps' web view at a new address, a store cleared by hand) still opens with its password (`headLock`, `takeHeadLock`).

The desk's writer (`deskWrite`, called by `saveState`): one sealing at a time, the newest desk always the one written; what is still on its way when the window hides or closes is sealed at once with the plain JavaScript AES-GCM (`flushSync`), so the last change is never lost. On the computer apps the shell's own bridge is wrapped (`wrapShell`): `save_state`, `big_put` and `big_get` seal what reaches the disk and open what comes back, so every path that writes `desk.json` or a `big/*.txt` is covered at once.

## 5. What is sealed, and what is not

Sealed with the lock on (the module's own list):

* localStorage `ingenium_v4` (the desk) and its recovery shelf, and the desk's overflow copy;
* IndexedDB `ingenium_big` (the long texts: attachments, pages, documents), each text sealed with additional data `"big:<id>"`;
* `ingenium_claude` (conversations brought in from elsewhere), `ingenium_keys` (the signing keys), `ingenium_hub` (Fabrica's issues and pages): records as in section 3;
* from 6.32, as bytes: `ingenium_apps` (the app library), `ingenium_repos` (Fabrica's repositories: objects and each repository's record) and `fabrica_made` (the packages Fabrica made) (`BSTORES`). Fabrica's objects keep their kind, size, depth and base in clear beside the sealed part, bound to it as additional data (`BCLEAR`), so the repository can make room and copy itself without opening every object. The names records are filed under (an object's SHA-1 name, a repository's id, a package's name) are not sealed;
* on the computer apps: `desk.json`, `big/*.txt` and the keys' copies on disk, through the shell's bridge;
* from 7.54 (Sign out, record 03): the documents of the apps carried on the Desk, and Scriba's recordings, in the owner's own profile.

Not sealed: backups made by the Backup page (plain zips, unless "Seal the whole backup" is chosen there, which it is by itself while the lock is on, from 6.30); model files; the engine.

Older stores are sealed in place, one record at a time, so that a stop midway loses nothing: every reader takes a plain record and a sealed one alike, and an unfinished sealing goes on at the next sign-in. A text is replaced only if the store still holds the very text that was read (`swap`). Turning protection off opens everything again the same way.

## 6. The flows

### 6.1 Turning protection on (`setup`)

1. Where WebCrypto is missing (a page opened from a file, or over plain http at an address that is not localhost), the door says so in plain words and offers only Close: "A sign-in with a password works only where the browser offers its cryptography: in the Ingenium apps, or a page opened at localhost or over https."
2. "Protect this copy with a sign-in": a user name (filled with the name Ingenium already holds, `state.persona.name`), a password, the same password again. "Choose one you will remember: there is no way to reset it, only the recovery phrase shown next."
3. "Your recovery phrase": the ten words, in order, with "Write these ten words down, in this order, and keep them somewhere safe, away from this device." Keys: Back, I have written them down.
4. Two of the words asked back ("word N and word M"), then everything on the device sealed, with a progress line, and the card "Protected".

### 6.2 Signing in (`signIn`)

* The card: Ingenium; "Welcome back, <name>."; the user name filled in; the password; Can't sign in? (the ways back in, section 6.7) and Sign in.
* A user name that does not match the record is refused with "That user name and password do not open this copy. Nothing was changed."
* With the computer's own sign-in set up, the computer app offers it beside the password.
* After a right password: the keys are held (`holdKeys`, which fires the window event `ing-keys` with `{held:true}`), the sealed desk is opened and handed to the page (`takeDesk`), then the hook `window.__ingAfterOpen` is called if a part set it (Sign out uses it), then the door goes.

### 6.3 Asking for the password again (`askPassword`)

What changes the lock (change the password, set up a way back in, turn protection off) asks for the password again over the open page; a wrong one changes nothing ("That is not the password. Nothing was changed."). From 7.51, `IngLock.confirm(title, text, okText)` asks the same question for other parts (Ask before each export, record 07): it resolves true once the password is right, false when cancelled or when the page locks meanwhile, and true when there is no sign-in.

### 6.4 Lock now and the lock after time away (`lockNow(why)`)

* `why` is `"press"` (the Lock now key), `"idle"` (the time away ran out) or `"signout"` (record 03).
* After time away, a lock waits while something is still working (a reply being written, a build running, Fabrica making something, the reading page writing) and starts the clock again.
* The steps, in order: the hook `window.__ingBeforeLock(why)` is called if a part set it, and waited for (Sign out seals the carried apps' documents there); the event `ing-keys` with `{held:false, locking:true}` (the computer app drops its disk key); what was typed in the chat's box and not sent is kept with the desk (`state.__lockDraft`) and put back after the sign-in; `saveState()` and `flushSync()`; the loading page shows "Locked after time away. Sign in to open your desk again.", or "Signed out. Everything of yours is sealed until you sign in again.", or "Locked. Sign in to open your desk again."; 350 ms later the page starts again (`location.reload()`), so nothing of the session stays in memory.
* The time away is set in the sign-in's own card: never, 5 minutes, 15 minutes, an hour (`idle` in the record).

### 6.5 At boot

The page reads the desk raw. If it is a sealed desk (`{"ing":"locked"…`), the raw text is kept as `window.__ingLockedRaw`, the page starts with an empty desk underneath, and the sign-in door is drawn over everything, opaque, in the look the header names (`night()` reads the header's theme; `auto` follows the system's dark setting). If the desk is sealed but no lock record can be found (neither in the store nor in the header), the door says so and offers "Start with an empty desk": the sealed desk and its record are set aside under `.sealed-<time>` names, never destroyed (`startOver`).

### 6.6 Turning protection off (`disableAsk`, `disable`)

Asked with the password: "Everything sealed on this device is written back as plain text, the sign-in goes, and the recovery phrase is of no further use." Then, with a progress card: the desk written back as plain text; the long texts opened one at a time; the records brought in from elsewhere, the signing keys and Fabrica's pages opened; the app library and Fabrica's apps and packages opened; the older desk copies opened; then the lock record removed, the keys dropped, and "Protection is off".

### 6.7 The ways back in (6.9.9 and 6.10.1)

Her words (3 November 2026): "I want a proper and strong and robust recovery system on Ingenium so that a user does not get locked out of their work ... I want a path that protects me and ensures that I can always find a way back into my account on Ingenium." Every way back in opens the same data key, each on its own:

* the password;
* the ten words (`rec` in the record);
* a recovery key file: a random key of 256 bits that wraps the data key with AES-GCM (additional data `"ingenium-lock file"`); the record keeps only the wrapped key and the file's id, so the newest file alone opens it. The file is JSON, `{kind:"ingenium-recovery-key", v:1, user, made, lock, id, key, about}`, saved as `Ingenium recovery key (<name>).ingenium-key` (`saveKeyFile`);
* the computer's own sign-in (Touch ID or the Mac's password; Windows Hello), on the computer apps only: the data key wrapped with a key the computer keeps in its own protection (the Mac's keychain, Windows' DPAPI), given to the page only after the computer has confirmed it is the owner (`desktop/app_device_6101.py`, `tools/IngeniumKey.swift`); additional data `"ingenium-lock device"`. "Anyone who can sign in to the computer as her can open Ingenium this way: that is said when it is turned on." Opened so, the password can be changed without the old one;
* a hint written by the owner (`hint`, up to 120 characters, kept in plain words because it is shown before the sign-in); a hint that holds the password, or most of it, is refused (`hintGivesAway`).

There is no maker's key and no back door: "a copy opens only with what its owner keeps". So the ways back in are several, kept in different places, and checked now and then: a day after the sign-in is turned on, then a week, a month, and every three months (`REMIND_DAYS=[1,7,30,90]`), a short check asks whether the words and the file are where they were left.

## 7. The door (how it looks)

* `#ingLockDoor`: a fixed layer over the whole window (z-index 2147483001), centring one raised card (`.ild-card`). By day its ground is `#f5f3f7` and its ink `#221a2e`; by night (`.ild-night`) its ground is `#16131c` and its ink `#efe9f6`. Its colours are tokens on the door itself: `--ild-face-a`, `--ild-face-b`, `--ild-wall`, `--ild-ink`, `--ild-soft`, `--ild-line`, `--ild-fam`, `--ild-field`, `--ild-acc`.
* The card is raised: a gradient face, a light inner edge at the top and left, a darker wall at the right and foot, and three layered shadows; it rises in (`ildIn`, 0.46 s), and not at all with reduced motion.
* The main key (`.ild-key`) is violet (`linear-gradient(180deg,#7348be,#5d37a1)`) with a darker wall below it. The door's own rule: "a key never moves under the pointer (it would flicker when the pointer rests on its lower edge): it brightens, and sinks into its shadow when pressed". A quieter key is `.ild-ghost`; a key that destroys is `.ild-danger`; a link-like key is `.ild-link`, underlined.
* Over the welcome door, the sign-in takes the welcome card's own place (`.ild-indoor`), as wide, with nothing dimmed behind it (her words, 3 November 2026: "Ingenium's sign in page looks slightly awkward floating over the app's introduction door ... I want the app to keep its elegant and refined look").
* The offer to turn the sign-in on, on the welcome door, is a small key in the card's top-left corner, the twin of the theme switch in the top-right (her words, 1 November 2026: "The new sign in prompt section looks a bit cluttered on the introduction door").

## 8. The interface other parts use (`window.IngLock`)

`active()` a lock is set up; `on()` the keys are in hand and every write is sealed; `locked()` set up and not open; `ready()` a promise kept once the keys are in hand (at once with no lock); `sealed(s)`; `sealText(text, aad)` and `openText(env, aad)` (promises); `sealTextSync(text, aad)` (at once, `ING1.` only); `isRecEnv(v)`; `binStores`; `sealFor(db, store, key, value)` (waits for the keys while locked, so nothing is written in clear); `deskWrite`; `isDeskEnvelope`; `openDesk`; `adoptRaw` (also `lockedNow`); `openRecs`, `sealRecs`, `sealRec`, `openRec`, `openValues` (the Backup page); `lockNow(why)`; `setup(options)`; `user()`; `words` (the 512 words); `diskKey()`; `confirm(title, text, okText)`.

Hooks a part may set on `window`: `__ingBeforeLock(why)` (called and waited for before the lock goes on) and `__ingAfterOpen()` (called after the desk is opened at a sign-in). Event: `ing-keys` on `window`, with `detail.held` true when the keys are taken and false when they are dropped.

## 9. Tests

`rig/t_700_lock.js` (58 checks on 7.54's release page): turning protection on, the phrase and the words asked back, the sealed stores read raw, a wrong password, the right one, Lock now, the lock after time away, the ways back in, and turning protection off. See record 10.
