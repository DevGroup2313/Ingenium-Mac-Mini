# Ingenium record 10 · Words and functions

Part of the record, written from Ingenium 7.54's sources and brought up to 7.71 (23 November 2026). The words Ingenium uses, and every function, hook, event and name another part (or another app) relies on.

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
* **The practice studio**: Ingenium with sample work, opened from a door while no one is signed in; its own stores (`@practice`), nothing of anyone's, nothing the device shares changed, and nothing kept once it is left or its window closes.
* **Ingenium itself, signed and checked**: her owner key's signature on a release she installed, checked by the Mac and Windows apps at every start.

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
* The practice studio (r350, with its part in profiles_boot.js): `window.IngPractice`: `on()`, `enter()`, `leave()`, `again()`, `sample(night)`. `window.__ingProfiles.practice`: `on`, `put(name, value)`, `clear()`, `enter()`, `leave()`, `fresh()`, `appDue()`, `appDone()`; `window.__ingProfiles.practiceRefuses(name)`; `window.__ingPractice` (true in it). Its elements: `#ildPractice`, `#r350Open`, `.r350-door`, `#r350Pill`, `.r350-strip` (`#r350Again`, `#r350Leave`), `#r350RowAgain`, `#r350RowLeave`, `.r350-corner`, `.r350-sec`.

## 5. The other parts

* `window.IngSecurity` (r318): `cfg()` (More protection's switches), `set(key, value)`, `items`, `paint()`, `ask()` (the first start's question), `net`, `allowed(url)`, `allow`, `tick`, `slept()`, `fails`, `clip`, `log()` (the record of every opening, `state.secLog`), `view(v)`.
* `window.IngExportAsk` (r341): `on()`, `sealed(data)`.
* `window.IngRag` (rag/main.js), its sealing (7.59): `sealState()` (`{open, on, keyed, files: {sealed, plain, empty}}`), `dropProfile(id)`; the store worker's `seal.key`, `seal.openAll`, `seal.state`, `profile.drop`.
* `window.IngDiskSeal` (r340): `state()`, `describe(hasFabrica)`, `status()`, `sealNow()`; the computer app's `disk_key_hold`, `disk_key_drop`, `disk_unseal_all`, `disk_status`.
* `window.IngAppSign` (r349, 7.60; r352, 7.62): `state()`, `check(u8)`, `signPage(html, ctx)`, `checkPage`, `checkZip`, `checkFile`, `packageRow`, `lineFor`, `signedNote`, `cameIn(u8, name)` (checked as it comes in: `{go, r, s}`), `brief(r)`, `libChip(s)`.
* `window.IngOwnerOnly` (r354, 7.63): `wanted(id)`, `door(html, ctx)` (the page with its door first: `ctx` `{id, app, name}`), `blocked(html)` (a page that runs only its own scripts), `packageRow(box, r, pref, signRow)`, `well(chip)`, `apps()` (the apps kept for her alone, for the permission form: `{id, name}`), `namesOf(id, slug)`. The door's own words: an opening `{kind:"ingenium-app-opened", body:{kind, v:1, app, device, made}, kid, sig}` kept as `ingenium-door:<app>`; a kept permission is PermitCore's file as it came.
* `window.IngSelf2` (r355, 7.64): `api()` (the phone's or tablet's bridge as r348 asks it), `words(mine, st)`, `keys(s, mine, canSign)`, `alsoSign(api, key, kid, st)`, `act(k, ctx)`, `askNote(st)`. The computer app's `self_mobile_fields()`, `self_mobile_signature_put(text)`, `self_give_pick()`; the phone's and tablet's bridge `selfCheck({again})`, `selfSignaturePut({text})`, `selfSignatureGet()`. A signature of the copy for phones and tablets: the release's `app` is `ingenium-mobile`; one file for every device: `{"kind": "ingenium-release-signatures", "v": 1, "signatures": [...]}`.
* `window.IngScramble` (r356, 7.67): `ships(id, opt)` (a package with a target or a `ship` mark, for an app it is wanted for), `wanted(id)`, `onePage(id, x, opt)` (r349 asks it before the door and the signature: `x` scrambled, or as written and said why), `page(html)` (`{html, scripts, pages, left, before, after}`), `packageRow(box, r, pref)` (Package details' Scrambled code, `pref.scramble`), `lineFor(id)`, `madeNote(notes, k)` (the note `scrambled_<target>`), `state()`, `well(chip)`, `engine` (`Terser 5.51.2`). Terser rides as `<script type="ingenium/b64" id="ing-terser" data-bytes data-version>` after r356, where there is a Fabrica. The Ship marks `opt.ship`: `release` (r114), `web` (r178), `send` (r316).
* `window.IngReadable` (r357, 7.68): `state()`, `well(chip)`, `carried()` (the public halves of her reading keys this build carries), `markOf(html)` (`{slug, commit}` from `<meta name="ingenium-source">`), `holder(mark)` (the version as written, from her Fabrica); it extends `IngAppSign.cameIn` with `asWritten` and `s2`. Her reading key: `PermitCore._.get("readkey")`, `{kind: "ingenium-reading-key", v: 1, rid, pub, made, enc}`; its public half's file `reading_keys.json`.
* `window.IngStageKit` (r358, 7.69): `wrap(html, opts)` (the kit first in any page; `opts.persist` and `opts.relay` off), `tag(opts)`, `size`, `kept(key)` (the databases a page in the preview has handed over); r358 extends `csStoreLoad(key)` (its seed carries `__kit`, not enumerable: `{key, cookie}`) and `ingStageDoc(html, seed)` (the kit after the stand-in for local storage, the page's charset first after its doctype), and wraps `ingOpenApart`; the desk's `state.stageKits` (a page's store key to its long text); messages `{__ingKit: 1, op}` and `{__ingSave: 1, name, type, bytes}` (record 06, section 16).
* `window.IngStageClear` (r359, 7.69): `clear()` (Clear the preview), `held(page)`; a conversation's `stageCleared` (`{at, f}`: when, and the cleared page's fingerprint); More's key `#csClear`.
* `window.IngAsk` (r360, 7.70): `computer(a, ctx)` (the computer's sheet for an ask, from r319), `device(name, words, stop, ctx)` (the device's), `found(x, toCode, after)` (Press to ask, on a computer found nearby; the code as the other way), `devRow(row, d, key)` (Offer my models, beside a device), `lenderKeys(u, key)` (Offer my models to a device nearby); the sheets `#sealAsk`, `#akOffer`, `#akDone`. r274's `IngLend.ask(address, mode, known)`, `hello(address)`, `find`, `found()`, `me()`, `repaint()`, `state()`. The computer app's `share_asks()`, `share_offer(device, on)`, `share_usage()`, `share_memory()`; its routes `POST /ingenium/ask` (`{id, kind, name, pub, mode}`), `GET /ingenium/ask/state?rid=`, `POST /ingenium/ask/decline`; hello's `ask` and `offers` (record 06, section 17).
* `window.IngLendMeter` (r361, 7.70): `show()` (Mentes, with Lending now's panel open), `fold(shut)` (7.71), `colorOf(id)`, `palette` (eight colours), `choose(id, i)`; the desk's `state.lendColors` (a computer's id to its colour); the glow's classes `ak-glow` and `ak-in` on the who-answers keys (`#chatModelBtn`, `#activeModelPill`); the card `#akMeterCard`; the attributes `data-comp` and `data-lender` that r274 writes on each computer's card and on the lender's column. From 7.71 (her Design B): the key `#akLendKey` in `#akLend` at the end of Mentes' tabs, its panel `#akMeterCard`.
* `window.IngCarriedFolders` (r362, 7.71): `run()`, `carried()` (the apps this copy carries: `{key, name}` from `LIB_NAMES` and the `ing-builtin-<key>` copies); the desk's `state.folders.carried` (each app's key to the time its folder was made or found, so a folder she lets go is not made again).
* `window.IngNature` (r295; 7.71): `extend({places, icons, groups, assign})` (more places, each `{k, name, desc, group, make}`, `make` given r295's kit: `mk`, `rnd`, `biq`, `pinkGen`, `brownGen`, `verb`, `finish`, `burst`, `tone`), `_render(kind, cb)` (a place made into its buffer, for the tests and the previews); r363 adds ten places (`brook`, `cascade`, `lightrain`, `window`, `storm`, `dawn`, `forest`, `meadow`, `pond`, `campfire`) and the groups `water`, `rain`, `day`, `night`, `fire`.
* `window.IngSelfSign` (r348, 7.58): `state()`, `describe(mine)`, `check(again)`, `sign()`, `bring()`, `save()`, `put(text)`; the computer app's `self_check(again)`, `self_signature_put(text)`, `self_signature_get()`, `self_reveal()`, `self_quit()`. A signature file: `{kind:"ingenium-release-signature", v:1, release:{kind:"ingenium-release", v:1, app:"ingenium", version, edition, files, made}, kid, sig}`, the release's fields signed with PermitCore's `signWith` (ECDSA P-256, SHA-256, its fixed order).
* `window.IngPeek` (r351): `scan()` (every password field not yet given its key), `show(input, on)`; each field wrapped in `.ing-peek-wrap`, its key `.ing-peek` (`aria-label` Show the password or Hide the password, `aria-pressed`), the field marked `data-peek` and `data-secret`.
* `window.saveFileNative(name, type, bytes)`: every file Ingenium saves goes through it.
* `window.ingAsk({title, text, yes, no})`, `window.ingToast(text)`: Ingenium's own question and note.

## 6. Additional data strings (the places bound into each seal)

`"ingenium-lock dek"`, `"ingenium-lock recovery"`, `"ingenium-lock check"`, `"ingenium-lock phrase"`, `"ingenium-lock file"`, `"ingenium-lock device"`; `"desk"`; `"big:" + id`; `"rec:" + db + "/" + store + "/" + key`; `"carried " + key`; `"scriba recording " + id`; `"ingenium-cloud 1 " + id`. HKDF info: `"ingenium-disk 1"` (7.49); `"ingenium-rag 1"` (7.59). The index's sectors: the file's salt and the sector's number.
