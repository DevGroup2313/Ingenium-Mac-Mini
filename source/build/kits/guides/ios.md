# {APP_NAME} for {DEVICE}: build kit

Kit made on {DATE} by Ingenium's builder, from Ingenium's build files ({BUILD_FILES}).

## In brief

[[if !NEW]]
1. Put the contents of the folder `files_for_github` into a private GitHub repository (section 5), or use the repository you already have (section 4).
[[end]]
[[if NEW]]
1. Put the contents of the folder `files_for_github` into a new private GitHub repository (section 5).
[[end]]
2. GitHub builds and tests the app by itself on one of its Mac computers, in about 15 minutes.
3. On a computer, download `{APP_FILE}-iPhone-iPad-unsigned.ipa` from the repository's **Releases** page and install it on the {DEVICE} with Sideloadly (section 6).

## 1. What this kit does

This kit lets you build the {APP_NAME} app for {DEVICE} yourself, on GitHub, without further help. GitHub's computers do all of the building. One app serves both iPhone and iPad, so the {OTHER} kit contains the same files; only this guide's wording differs.

[[if NEW]]
{APP_NAME} is its own app, with its own app id (`{APP_ID}`). It installs beside Ingenium, never over it.

[[end]]
Each build makes these files:

| File | What it is | Size |
| --- | --- | --- |
[[if MODEL]]
| `{APP_FILE}-iPhone-iPad-unsigned.ipa` | The app, with two models built in: {MODEL_NAME} | about {APP_MB} MB |
| `{APP_FILE}-iPhone-iPad-no-model-unsigned.ipa` | The same app without the built-in models | about 5 MB |
[[end]]
[[if !MODEL]]
| `{APP_FILE}-iPhone-iPad-unsigned.ipa` | The app | about 5 MB |
[[end]]

[[if MODEL]]
During each build, GitHub starts the app in an iPhone simulator. The first built-in model must answer a question, and the second must think before it answers. The files are published only if both happen.
[[end]]
[[if !MODEL]]
During each build, GitHub starts the app in an iPhone simulator and checks that its page opens. The file is published only if it does.
[[end]]

**Apple's rule.** Apple lets an app onto an iPhone or iPad only when it is signed with an Apple ID. A build on GitHub cannot do that for you, so the files are "unsigned", and you sign them once on a computer when you install them (section 6). This applies to every app installed outside the App Store, not only to {APP_NAME}.

## 2. What is in this kit

| Item | Purpose |
| --- | --- |
| `START_HERE.html` and `START_HERE.txt` | This guide, as a web page (it opens in any browser, which can also print it) and as plain text |
| `files_for_github/` | Every file the GitHub repository needs, already in the right folders ({FILE_COUNT} files) |
| `build_file_copy/build-ios.yml.txt` | A visible copy of the build instructions file (see step B5) |

The most important parts of `files_for_github/` are these:

| Path | Purpose |
| --- | --- |
| `.github/workflows/build-ios.yml` | Tells GitHub how to build, test and publish the app. On a Mac this folder is hidden. |
| `app.json` | Who the app is: its name, its app id and the start of its file names |
| `ingenium.html` | The app's page, which the app displays. The file keeps this name so that every build step finds it. |
| `ingenium_ios_project/` | The iPhone and iPad app around the page |
| `native/` | The engine that runs models (llama.cpp, version b11321) |
| `mobile_models.json` | Which models are built into the app (if any), and where the build downloads them |
| `tools/`, `licences/`, `THIRD_PARTY_NOTICES.txt` | Build helpers and licences |
| `INSTALL_MOBILE.md`, `README_FIRE.txt` | Longer notes on installing and using the apps |

[[if MODEL]]
The models themselves (about {MODEL_MB} MB together) are not in the kit, because they are too large. Each build downloads them from Hugging Face and checks each against a fixed fingerprint (its SHA-256 value). A changed or damaged file is refused.
[[end]]

## 3. What you need

* Your GitHub account.
* A computer (Mac or Windows) with Chrome, Edge or Safari, for the upload and for installing the app.
* A free tool that signs and installs the app: **Sideloadly** (https://sideloadly.io) or **AltStore** (https://altstore.io). This guide describes Sideloadly.
* An Apple ID, and the {DEVICE}'s charging cable.
* The {DEVICE} with {OS} 16.4 or newer. **Settings**, then **General**, then **About** shows the version.
[[if MODEL]]
* Free space on the {DEVICE}: approximately {APP_MB} MB for the full app.
[[end]]

[[if !NEW]]
## 4. Way A: rebuild in the repository you already have

If the repository `yabban-maker/Ingenium-Fire-` still exists, it already contains these build files. GitHub shows its **Run workflow** button only for builds that are on the main branch. If the newest work is still on another branch (when this guide was written it sat on `claude/magical-darwin-ppq4pn`), merge that branch once first.

### A1. Merge the work into the main branch (once only)

1. Open https://github.com/yabban-maker/Ingenium-Fire-
2. Click **Pull requests**, then **New pull request**.
3. Set **base** to `main` and **compare** to the branch with the newest work.
4. Click **Create pull request**, then click **Create pull request** again.
5. Click **Merge pull request**, then **Confirm merge**.

Merging starts the builds at once. That is expected. If GitHub reports that the branches cannot be merged automatically, stop and use Way B instead.

### A2. Start a build whenever you wish

1. Open the repository and click **Actions**.
2. On the left, click **Build {APP_NAME} for iPhone and iPad**.
3. Click **Run workflow** on the right, keep the branch `main`, and click the green **Run workflow** button.
4. Wait about 7 minutes (about 15 when GitHub has to build the engine again). A green tick means the build worked. A red cross means it stopped; see section 9.

To update the app's page in that repository instead of starting afresh, use **Add file**, then **Upload files** to upload the new `ingenium.html` from `files_for_github`, and click **Commit changes**. A build starts by itself.

### A3. Find the finished files

On the repository's main page, click **Releases** on the right, then **{APP_NAME} (latest build)**. The files are listed under **Assets**. Each new build replaces them.

[[end]]
[[if NEW]]
## 4. A repository of its own

{APP_NAME} needs a repository of its own, separate from Ingenium's, so that its builds and its Releases page stay apart. Section 5 creates it. Later updates are made in that same repository (step B6).

[[end]]
## 5. Way B: build in a new repository from this kit

[[if !NEW]]
Use this way if the old repository no longer exists, or to start afresh.

[[end]]

### B1. Create the repository

1. Sign in at github.com. Click **+** at the top right, then **New repository**.
2. Give it a name, for example `{REPO_SUGGESTION}`.
3. Choose **Private**, so only you can see the files (section 10 explains the build minutes).
4. Leave the other settings as they are and click **Create repository**.

### B2. Unzip the kit on your computer

Double-click the kit's zip file, then open the folder `files_for_github` inside it.

On a Mac, the `.github` folder inside it is hidden. In Finder, press **Command**, **Shift** and **.** (full stop) together to show hidden files. The same keys hide them again later. On Windows, the folder is visible.

### B3. Upload the files

1. On the new repository's page, click the link **uploading an existing file**. (Alternatively click **Add file**, then **Upload files**.)
2. In Finder or File Explorer, select everything inside `files_for_github`, including `.github`. Do not select the folder `files_for_github` itself.
3. Drag the selection into the browser window, onto the upload area. Folders keep their structure.
4. Wait until all {FILE_COUNT} files are listed.
5. Check that the list includes `.github/workflows/build-ios.yml`.
6. Click **Commit changes**.

### B4. Watch the first build

Click **Actions**. The build **Build {APP_NAME} for iPhone and iPad** starts by itself after the upload. The first build in a new repository takes about 15 minutes, because it also builds the engine; later builds reuse it from GitHub's build cache and take about 7 minutes. If GitHub asks whether to enable workflows, enable them and start the build: click the build's name on the left, then **Run workflow**. When it finishes, the files are on the repository's **Releases** page, under **{APP_NAME} (latest build)**.

### B5. If the build file did not upload

If **Actions** shows no build, the hidden `.github` folder was left out. Create the file by hand:

1. On the repository page, click **Add file**, then **Create new file**.
2. In the name box, type exactly `.github/workflows/build-ios.yml`. Each `/` creates a folder.
3. Open `build_file_copy/build-ios.yml.txt` from the kit in a text editor (TextEdit or Notepad). Select all of it, copy it, and paste it into the large box on GitHub.
4. Click **Commit changes** (twice, if GitHub asks again). The build starts.

### B6. Later updates

To publish a new version of the app's page, make a fresh kit with Ingenium's builder, then upload only its `files_for_github/ingenium.html` to the same repository (**Add file**, **Upload files**, **Commit changes**). The build starts by itself.

## 6. Install the app on the {DEVICE}

These steps are an outline. Sideloadly's own instructions on its website are the reference, because its screens change between versions.

1. On the computer, sign in at github.com, open the repository's **Releases** page, and download `{APP_FILE}-iPhone-iPad-unsigned.ipa`.
2. Install Sideloadly from https://sideloadly.io. On Windows, its site explains which Apple programs (iTunes and iCloud) it needs first.
3. Connect the {DEVICE} with its cable and unlock it. If the {DEVICE} asks whether to trust the computer, tap **Trust**.
4. Open Sideloadly, drag the `.ipa` file onto it, enter your Apple ID, and click **Start**. Sideloadly sends your Apple ID details to Apple to sign the app. If you prefer, create a second, free Apple ID for this purpose.
5. On the {DEVICE}, open **Settings**, then **General**, then **VPN & Device Management**. Tap your Apple ID, then **Trust**.
6. On {OS} 16 and later, also turn on **Developer Mode**: **Settings**, then **Privacy & Security**, then **Developer Mode**. The {DEVICE} restarts and asks you to confirm.
7. Open {APP_NAME}.

**The 7-day limit.** With a free Apple ID, the signature lasts 7 days. After that, {APP_NAME} does not open until you sign it again: repeat step 4 with the same file. The app's data remains. A free Apple ID can also keep only 3 such apps on a device at once. A paid Apple Developer membership makes the signature last a year. AltStore can renew the signature by itself when its helper program runs on a computer on the same Wi-Fi; see its own guide. These are Apple's rules at the time of writing and may have changed.

[[if !NEW]]
**Which build you have.** Tap **About** at the top right of the app (the round ⓘ key on a narrow screen). The version and the build number stand at the bottom of About, and again at the end of the Guide, for example "Version 3.0 · build 20261007.1". The Releases page lists the same number for each app. A matching number means the newest build is installed.

[[end]]
[[if MODEL]]
**Removing the built-in models.** Hiding one in the app keeps its space, because an installed app cannot shrink. To recover the space, install `{APP_FILE}-iPhone-iPad-no-model-unsigned.ipa` with the same tool and the same Apple ID, so that it replaces the full app as an update. This step has not been tried on a real device.
[[end]]

[[if !NEW]]
## 7. Adding your own models on the {DEVICE}

* In the app, open the Models page and tap **Tap here to add a model file (.gguf)**. Ingenium copies the chosen file into its own library.
* Alternatively, in the Files app, place `.gguf` files in **On My {DEVICE}**, then **Ingenium**, then **Models**. They appear the next time the Models page opens.

Choose GGUF files whose names contain `Q4_K_M`. As a rough guide, a {DEVICE} with 4 GB of memory or more handles models up to about 3B parameters (files of about 2 GB). Older models with 3 GB or less may struggle even with the built-in 2B model; on those, the no-model copy and a model of about 0.5B to 1B parameters are the safer choice. These figures are approximate.

* **Ingenium's models.** The card at the top of the Models page shows four houses: **Velox** (the fastest), **Scriba** (it thinks before it answers), **Magister** (the strongest) and **Faber** (the coding model). The two built-in models are Velox and Scriba. Tap **Install** on another, and the app downloads it from Hugging Face, checks it against its fixed fingerprint and keeps it. Magister is Qwen3.5 4B (about 2.7 GB) where the memory allows, otherwise LFM2.5 2.6B; Faber is LFM2.5 2.6B (about 1.7 GB).
* **Convert a model.** A model in another form (Hugging Face's safetensors, PyTorch's .bin, or MLX) becomes a GGUF on the {DEVICE} itself: choose all the files in the model's folder, choose a size, and tap **Convert**. A phone or tablet converts slowly, so small models suit it best; a computer does the same job much faster.
* **A computer's models.** A Mac mini or another computer running {APP_NAME} can lend its stronger models over your home Wi-Fi. The first time, the {DEVICE} asks whether {APP_NAME} may find devices on your local network: allow it. On that computer, Settings, **Your models on every device**, switch on sharing; here, in the same card, enter the address and the pairing code it shows and tap **Connect**. The chat then uses that computer's models; the source row under the chat switches back to this device's own. If the computer's name does not work, use the number address it shows.

[[end]]
## 8. The built-in models (optional)

[[if MODEL]]
The built-in models are chosen in `mobile_models.json`, under `"ios"`: a list of up to two. More would make the app file larger than GitHub's Releases page accepts (about 2 GB per file). Ingenium's own models carry a `lineup` field; the build checks that they agree with the list in the app's page, so leave those entries as they are. A model of your own choosing goes in the list without a `lineup` field.
[[end]]
[[if !MODEL]]
This app has no built-in model (`mobile_models.json` says `null` under `"ios"`). To give it one, put a list with one entry there, using the fields below.
[[end]]

| Field | Meaning |
| --- | --- |
| `file` | The file name the model receives inside the app |
| `name` | The name shown in the app |
| `url` | The address the build downloads it from |
| `sha256` | The file's fingerprint. The build refuses any other file. |
| `size` | The file's size in bytes |
| `licence` | The name of a file in `licences/` holding the model's licence text |

To use a GGUF model from Hugging Face:

1. Open the model file's page on huggingface.co. For a large file, the page normally lists its SHA256 value and its size; copy both.
2. The download address has the form `https://huggingface.co/OWNER/MODEL/resolve/main/FILE.gguf`.
3. Put the model's licence text into `licences/` and its file name into `licence`.
4. Edit `mobile_models.json` on GitHub: open it, click the pencil icon, change the values, and click **Commit changes**. A build starts by itself.

## 9. If something goes wrong

Open **Actions**, click the failed run, and click the step marked with a red cross to read what happened. To try again, click **Re-run jobs**, then **Re-run failed jobs**.

| Where it stopped | What to do |
| --- | --- |
| No build starts at all | Check that `.github/workflows/build-ios.yml` exists at exactly that path (step B5). Under **Settings**, **Actions**, **General**, make sure actions are allowed. |
| **Get llama.cpp b11321**, or **Put the built-in model and the current page into the app** | A download failed. Re-run later. If it keeps failing, the model may have moved on Hugging Face; see section 8. |
| **Read who the app is (app.json)** | `app.json` is missing or damaged. Upload it again from the kit. |
| **Build the engine** | Re-run once. If it fails again in the same way, a file was probably changed or uploaded incompletely; upload the kit again. |
| **Build for the simulator...** | The simulator sometimes starts slowly on GitHub's computers. Re-run once. The part of that step's log headed "what the app said" explains a real failure. |
| **Publish to the Releases page**, with a permission error (403) | Under **Settings**, **Actions**, **General**, **Workflow permissions**, choose **Read and write permissions**, click **Save**, then re-run. |
| A message that a runner or an action version is no longer supported | GitHub retires old versions over time. In the build file, `runs-on: macos-15` may be changed to a newer Mac label from GitHub's documentation (for example `macos-latest`), and an action's `@v4` to the newest version listed on that action's own GitHub page. A newer Mac may bring a newer Xcode, which can occasionally require changes. |
| Sideloadly reports an error | Follow Sideloadly's own help pages. Common causes are an Apple ID that needs a second sign-in step, or the 3-app limit of a free Apple ID. |
| The app stops opening after a week | The 7-day signature has expired. Sign it again (section 6). |

## 10. Costs

On a private repository, GitHub's free plan includes 2,000 build minutes a month, and minutes on GitHub's Mac computers count ten times. The first build in a new repository therefore uses approximately 140 to 160 of the 2,000, and later builds approximately 70 to 80. GitHub removes a build cache that has not been used for about a week, so a build after a longer pause takes as long as the first. Keep the repository private, so only you can see its files. These are GitHub's terms at the time of writing and may change; the billing section of your GitHub account settings shows the current ones.

## 11. What was and was not checked

* {TESTED_IOS}
[[if NEW]]
* {APP_NAME}'s own page has not been built on GitHub yet. Its first build checks that the page opens in the simulator.
[[end]]
* The app has not been tried on a physical iPhone or iPad. The simulator cannot use the graphics chip, so the app's speed on your {DEVICE} is not yet known. If the graphics chip cannot load a model, the app falls back to the processor.
* GitHub and Sideloadly rename buttons and pages from time to time. If a button named here is missing, look for the nearest equivalent.
