# Ingenium record 05 · Where every piece of data lives

Part of the record of Ingenium's security system, written from Ingenium 7.54's sources (20 November 2026). The labels in quotation marks are the ones the Storage page shows (`build/modules/r142.js`, `LABELS`). "Per profile" means the store is renamed with `@<profile id>` in every profile but the owner's (record 04, section 3); "shared" means the device keeps one copy for every profile. "Sealed" means sealed under the data key while the sign-in is on (record 02).

## 1. The browser's small store (localStorage)

| Name | What it holds | Per profile or shared | Sealed with the sign-in on |
|---|---|---|---|
| `ingenium_v4` | the desk: the whole state (chats, notes, settings, projects and folders, Lector, Vocatio, Focus, Blend) | per profile | yes, as the sealed desk with its clear header (record 02, section 4) |
| `ingenium_v4.snap0`, `.snap1`, `.snap2` | the recovery shelf: three earlier copies of the desk, taken at most every 45 seconds, for desks under 1 MB (`SNAPRING`, `ingNoteSnapshot`) | per profile | yes |
| `ingenium_lock` | the lock record (record 02, section 2.3); opens nothing without the password or a way back in | per profile (each profile's sign-in is its own) | not needed: it holds only wrapped keys |
| `ingenium_profiles` | the list of profiles, which one is in use, and the signed out mark (record 04) | shared | no; it names profiles, it holds none of their data |
| `ingenium_models_shared` | the models' record, so every profile lists the same models | shared | no |
| `ing.security.v1`, `ing.security.fails.v1`, `ing.security.asked.v1` | the device's security settings (More protection's switches), the count of wrong passwords, whether the first-start question was asked | shared | no |
| `ing.gpu.diamond`, `ing.diamond.trying` | the graphics measure | shared | no |
| `tabula_…`, `abacus_…`, `scriba_…`, `fontes_…`, `carpe_…`, `cd_…` | the documents of the apps carried on the Desk (Tabula, Abacus, Imago, Scriba, Fontes), in the owner's master copy only | per profile (only the owner's profile carries the Desk) | from 7.54: at every lock, Sign out and page close (record 03) |
| `ing_carried_sealed:<key>` | a carried document that could not be opened at a sign-in, kept aside, never lost | per profile | stays as it was |
| `ingenium_lock.sealed-<time>`, `ingenium_v4.sealed-<time>` | a sealed desk and its record set aside by "Start with an empty desk" (never destroyed) | per profile | already sealed |

sessionStorage holds marks for the length of a session, renamed per profile as localStorage is (for example `ing.profile.entered`, set when a profile is switched).

## 2. The browser's larger store (IndexedDB)

| Database | The Storage page's words | Per profile or shared | Sealed with the sign-in on |
|---|---|---|---|
| `ingenium_big` (store `t`) | "Long texts: Files and pages your chats, Lector, Code and Build hold" | per profile | yes, each text `"big:<id>"` |
| `ingenium_desk` | "The desk's larger copy: Your desk, when the small store is too full for it" | per profile | yes, it holds the sealed desk |
| `ingenium_claude` | conversations brought in from Claude, Claude Code and Ollama | per profile | yes, records |
| `ingenium_keys` | "Signing keys: The keys your Android apps are signed with" | per profile | yes, records |
| `ingenium_hub` | "Fabrica's issues and pull requests: What you wrote about your apps in Fabrica" | per profile | yes, records |
| `ingenium_apps` (store `b`) | "Your app library: The pages of your apps, with their newest versions" | per profile | yes, as bytes (from 6.32) |
| `ingenium_repos` (stores `o`, `r`) | "Fabrica's history: Every version of the apps you make in Fabrica" | per profile | yes, as bytes; an object's kind, size, depth and base stay clear, bound as additional data |
| `fabrica_made` (stores `meta`, `bytes`) | "Fabrica's packages: Apps and kits Fabrica made, kept to save again" | per profile | yes, as bytes |
| `ingenium_meaning` | "Fabrica's finds by meaning: What each file of your repositories means, as numbers ... made again if let go" | per profile | no (numbers only, made again when needed) |
| `ingenium-buildlib` | "Your build library: The notes on how your apps were built, brought in on the Folders page" | per profile | no |
| `ingenium_cloudkey` | "Ingenium Cloud's key: Made from your Cloud passphrase on this device; it never leaves it" | per profile | kept as a key the page cannot read out |
| `ingenium_files` | "Files and the engine: The engine, links to your files, and files you added" | shared | no (model files and the engine are not sealed) |
| `the_foundry_files` | "An older store: Left from an earlier version" | shared | no |
| `ingenium_seal` | the device's sealed pairing with a computer (record 06, section 4) | shared | its private key never leaves the store |
| `tensorflowjs` | the training lab's models | shared | no |
| `scriba_db` (store `recordings`) | Scriba's recordings, in the owner's master copy | per profile | from 7.54: at every lock and Sign out (record 03) |
| `cd_scriba_store` | "The speech engine: What writes down your dictation on this device" | per profile (it is not among the shared names) | no (an engine, not her words) |
| Cache Storage `cd-scriba-1044` | the speech engine's files | shared (the profiles' wrapper does not cover Cache Storage) | no |

The folder search keeps its index in the browser's private file system (OPFS), per profile through its own reader (`p:<id>`); sealing that index is approved and planned (record 06, section 7).

## 3. On the computer apps' disk (Mac and Windows)

* `desk.json` and `big/*.txt`: the computer app's own copy of the desk and the long texts. Sealed with the sign-in on, by the page, through the shell's bridge (record 02, section 4).
* Each profile's files are its own folder on the disk (`desktop/app_profiles_744.py`: `profile_current`, `profile_use`, `profile_drop`).
* Sealed with the disk key while the owner is signed in (record 06, section 3): the apps waiting for her devices and Fabrica's runs, their logs and files (7.49); the records of waiting apps under names that say nothing, a run's record once it ends, and texts for training (7.50).
* Not sealed: models on the disk, the engine, and a run's working files while the run is still running (sealed when it ends).

## 4. What leaves the device

* Backups (the Backup page, `r143`): plain zips unless "Seal the whole backup" is chosen, which it is by itself while the sign-in is on; a sealed backup begins with the line `INGENIUM SEALED BACKUP 1`.
* Any file Ingenium saves goes through `window.saveFileNative`; with Ask before each export on, an unsealed one asks for the password first (record 06, section 2).
* Ingenium Cloud: only sealed parts travel; the computer that keeps the Cloud cannot read them (record 06, section 5).
* Between the owner's devices: sealed end to end (record 06, section 4).
* To a model online: only when she chooses an online model or connection; the local models run on her own devices.
