# Ingenium record 10 · Words and functions

Part of the record, written from Ingenium 7.54's sources (20 November 2026). The words Ingenium uses, and every function, hook, event and name another part (or another app) relies on.

## 1. Words

* **The desk**: the app's whole state (`window.state`), kept under `ingenium_v4`.
* **Sealed**: encrypted with AES-GCM-256 under the data key, with the place it belongs to bound in; "opened": decrypted.
* **The data key** ("dek"): the one random key everything is sealed under.
* **The lock record**: `ingenium_lock`, the wrapped data key and how to unwrap it.
* **An envelope**: a sealed value (`ING1.…`, `ING1g.…`, `{ing:"sealed",…}`, the sealed desk).
* **The sign-in door**: `#ingLockDoor`, the full-window layer with the sign-in's card.
* **Who is using Ingenium**: the profiles door, `#profDoor`.
* **The Status panel**: the first key of the top bar, `openPresenceMenu()`.
* **A profile**: a person's own copy of every store on a shared device; "the owner" is the master copy's own.
* **Signed out**: the mark `out` on the profiles' list; the next start goes to Who is using Ingenium.
* **The ways back in**: the ten words, the recovery key file, the computer's own sign-in, the hint.
* **The carried apps**: the Desk's five apps in the master copy (Tabula, Abacus, Imago, Scriba, Fontes).
* **The master copy, the editions**: the owner's own Ingenium; the full, gift and demo editions built without anything of hers.

## 2. `window.IngLock` (r197)

| Name | What it does |
|---|---|
| `active()` | a lock is set up in this profile |
| `on()` | the keys are in hand, and every write is sealed |
| `locked()` | set up and not open |
| `ready()` | a promise kept once the keys are in hand (at once with no lock) |
| `sealed(s)` | true if a text is an envelope |
| `sealText(text, aad)`, `openText(env, aad)` | seal and open a text (promises) |
| `sealTextSync(text, aad)` | seal at once with the plain JavaScript AES-GCM (for a page that is closing) |
| `isRecEnv(v)`, `sealRec(db, store, key, value)`, `openRec(db, store, value)` | a store's record sealed and opened |
| `sealFor(db, store, key, value)` | waits for the keys while locked, then seals, so nothing is written in clear |
| `sealRecs`, `openRecs`, `openValues` | the Backup page's helpers |
| `binStores` | the stores sealed as bytes |
| `deskWrite(raw)` | the desk's writer, called by `saveState` |
| `isDeskEnvelope(s)`, `openDesk(env)` | the sealed desk |
| `adoptRaw(raw)`, `lockedNow(raw)` | a sealed desk arriving from the larger store or the disk |
| `lockNow(why)` | `"press"`, `"idle"`, `"signout"`: save, seal, drop the keys, start again; a promise of true when it locks |
| `setup(options)` | turn protection on (`options.onCancel` is called if cancelled) |
| `user()` | the user name |
| `words` | the 512 words of the recovery phrase |
| `diskKey()` | the disk key, `{b64, kid}`, while signed in |
| `ragKey()` | the folder search index's key, `{b64, kid}`, while signed in (7.59) |
| `confirm(title, text, okText)` | ask the password over the open page; a promise of true or false |

Hooks on `window`: `__ingBeforeLock(why)` (waited for before the keys go), `__ingAfterOpen()` (after a sign-in, before the door goes), `__ingBeforeOff()` (7.59: waited for while the sign-in is being turned off, before the lock record goes; a refusal keeps protection on). Event on `window`: `ing-keys`, `detail.held` true or false (and `locking` true when a lock begins). Globals set at load: `__ingLockedRaw` (the sealed desk, raw), `__ingLocked` (true while it is not open).

## 3. `window.IngSignOut` (r344)

`go()` (Sign out, with the question when there is no sign-in), `signedOut()`, `_seal()` and `_open()` (for tests).

## 4. Profiles

* `window.__ingProfiles` (profiles_boot.js): `reg()`, `save(o)`, `shared` (`ls` and `db` patterns), `suffix`, `rawKeys()`, `drop(id)`.
* `window.__ingProfile`: `{id:"owner", owner:true}`, or `{id, name, t, pw, owner:false}`; `window.__ingGuest`: true in another person's profile.
* `window.IngProfiles` (r331): `me()`, `list()`, `owner()` (true in the owner's profile), `switchTo(id)`, `door()`, `open()` and `close()` (the menu), `paint()` (Settings' card), and `_reg`, `_models` for tests.
* The computer apps' bridge: `profile_current()`, `profile_use(id)`, `profile_drop(id)`.

## 5. The other parts

* `window.IngSecurity` (r318): `cfg()` (More protection's switches), `set(key, value)`, `items`, `paint()`, `ask()` (the first start's question), `net`, `allowed(url)`, `allow`, `tick`, `slept()`, `fails`, `clip`, `log()` (the record of every opening, `state.secLog`), `view(v)`.
* `window.IngExportAsk` (r341): `on()`, `sealed(data)`.
* `window.IngRag` (rag/main.js), its sealing (7.59): `sealState()` (`{open, on, keyed, files: {sealed, plain, empty}}`), `dropProfile(id)`; the store worker's `seal.key`, `seal.openAll`, `seal.state`, `profile.drop`.
* `window.IngDiskSeal` (r340): `state()`, `describe(hasFabrica)`, `status()`, `sealNow()`; the computer app's `disk_key_hold`, `disk_key_drop`, `disk_unseal_all`, `disk_status`.
* `window.IngSelfSign` (r348, 7.58): `state()`, `describe(mine)`, `check(again)`, `sign()`, `bring()`, `save()`, `put(text)`; the computer app's `self_check`, `self_signature_put`, `self_signature_get`, `self_reveal`, `self_quit`.
* `window.saveFileNative(name, type, bytes)`: every file Ingenium saves goes through it.
* `window.ingAsk({title, text, yes, no})`, `window.ingToast(text)`: Ingenium's own question and note.

## 6. Additional data strings (the places bound into each seal)

`"ingenium-lock dek"`, `"ingenium-lock recovery"`, `"ingenium-lock check"`, `"ingenium-lock phrase"`, `"ingenium-lock file"`, `"ingenium-lock device"`; `"desk"`; `"big:" + id`; `"rec:" + db + "/" + store + "/" + key`; `"carried " + key`; `"scriba recording " + id`; `"ingenium-cloud 1 " + id`. HKDF info: `"ingenium-disk 1"` (7.49); `"ingenium-rag 1"` (7.59). The index's sectors: the file's salt and the sector's number.
