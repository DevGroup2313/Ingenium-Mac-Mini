# {APP_NAME} for Fire tablets: build kit

Kit made on {DATE} by Ingenium's builder, from Ingenium's build files ({BUILD_FILES}).

## In brief

[[if !NEW]]
1. Put the contents of the folder `files_for_github` into a private GitHub repository (section 5), or use the repository you already have (section 4).
[[end]]
[[if NEW]]
1. Put the contents of the folder `files_for_github` into a new private GitHub repository (section 5).
[[end]]
2. GitHub builds and tests the app by itself in about 25 minutes.
3. Download `{APP_FILE}-Android-Fire.apk` from the repository's **Releases** page on the Fire tablet and install it (section 6).

## 1. What this kit does

This kit lets you build the {APP_NAME} app for Fire tablets yourself, on GitHub, without further help. GitHub's computers do all of the building. You need only a web browser, your GitHub account and the tablet.

[[if NEW]]
{APP_NAME} is its own app, with its own app id (`{APP_ID}`). It installs beside Ingenium, never over it.

[[end]]
Each build makes these files:

| File | What it is | Size |
| --- | --- | --- |
[[if MODEL]]
| `{APP_FILE}-Android-Fire.apk` | The app, with two models built in: {MODEL_NAME} | about {APP_MB} MB |
| `{APP_FILE}-Android-Fire-no-model.apk` | The same app without the built-in models | about 26 MB |
[[end]]
[[if !MODEL]]
| `{APP_FILE}-Android-Fire.apk` | The app | about 26 MB |
[[end]]

The same files also work on Android phones and tablets.

[[if MODEL]]
During each build, GitHub installs the app on a test Android device (an emulator). The first built-in model must answer a question, and the second (the thinking model) must think before it answers. The files are published only if both happen.
[[end]]
[[if !MODEL]]
During each build, GitHub installs the app on a test Android device (an emulator) and checks that its page opens. The file is published only if it does.
[[end]]

## 2. What is in this kit

| Item | Purpose |
| --- | --- |
| `START_HERE.html` and `START_HERE.txt` | This guide, as a web page (it opens in any browser, which can also print it) and as plain text |
| `files_for_github/` | Every file the GitHub repository needs, already in the right folders ({FILE_COUNT} files) |
| `build_file_copy/build-android.yml.txt` | A visible copy of the build instructions file (see step B5) |

The most important parts of `files_for_github/` are these:

| Path | Purpose |
| --- | --- |
| `.github/workflows/build-android.yml` | Tells GitHub how to build, test and publish the app. On a Mac this folder is hidden. |
| `app.json` | Who the app is: its name, its app id and the start of its file names |
| `ingenium.html` | The app's page, which the app displays. The file keeps this name so that every build step finds it. |
| `ingenium_android_project/` | The Android app around the page |
| `native/` | The engine that runs models (llama.cpp, version b11321) |
| `mobile_models.json` | Which models are built into the app (if any), and where the build downloads them |
| `signing/` | Where the build puts your signing key while it builds. The kit carries no key (section 7). |
| `tools/`, `licences/`, `THIRD_PARTY_NOTICES.txt` | Build helpers and licences |
| `INSTALL_MOBILE.md`, `README_FIRE.txt` | Longer notes on installing and using the apps |

[[if MODEL]]
The models themselves (about {MODEL_MB} MB together) are not in the kit, because they are too large. Each build downloads them from Hugging Face and checks each against a fixed fingerprint (its SHA-256 value). A changed or damaged file is refused.
[[end]]

## 3. What you need

* Your GitHub account.
* A computer with Chrome, Edge or Safari for the upload. A tablet browser cannot reliably upload folders.
* The Fire tablet, with Fire OS 6 or newer. The app needs Android 7.0 or newer; as far as I know, Fire OS 6 is based on Android 7.1. **Settings**, then **Device Options**, then **System Updates** shows the tablet's version.
[[if MODEL]]
* Free space on the tablet: approximately twice the app's size while installing (the download plus the installed app), and approximately the app's size afterwards if you delete the downloaded file.
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
2. On the left, click **Build {APP_NAME} for Fire and Android**.
3. Click **Run workflow** on the right, keep the branch `main`, and click the green **Run workflow** button.
4. Wait about 25 minutes. A green tick means the build worked. A red cross means it stopped; see section 9.

To update the app's page in that repository instead of starting afresh, open `ingenium.html` there, use **Add file**, then **Upload files** to upload the new `ingenium.html` from `files_for_github`, and click **Commit changes**. A build starts by itself.

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
3. Choose **Private**. Your app's page and its build files are yours, and no one else should see them.
4. Leave the other settings as they are and click **Create repository**.

### B2. Unzip the kit on your computer

Double-click the kit's zip file, then open the folder `files_for_github` inside it.

On a Mac, the `.github` folder inside it is hidden. In Finder, press **Command**, **Shift** and **.** (full stop) together to show hidden files. The same keys hide them again later. On Windows, the folder is visible.

### B3. Upload the files

1. On the new repository's page, click the link **uploading an existing file**. (Alternatively click **Add file**, then **Upload files**.)
2. In Finder or File Explorer, select everything inside `files_for_github`, including `.github`. Do not select the folder `files_for_github` itself.
3. Drag the selection into the browser window, onto the upload area. Folders keep their structure.
4. Wait until all {FILE_COUNT} files are listed.
5. Check that the list includes `.github/workflows/build-android.yml`.
6. Click **Commit changes**.

### B4. Watch the first build

Click **Actions**. The build **Build {APP_NAME} for Fire and Android** starts by itself after the upload. If GitHub asks whether to enable workflows, enable them and start the build: click the build's name on the left, then **Run workflow**. When it finishes, the files are on the repository's **Releases** page, under **{APP_NAME} (latest build)**.

### B5. If the build file did not upload

If **Actions** shows no build, the hidden `.github` folder was left out. Create the file by hand:

1. On the repository page, click **Add file**, then **Create new file**.
2. In the name box, type exactly `.github/workflows/build-android.yml`. Each `/` creates a folder.
3. Open `build_file_copy/build-android.yml.txt` from the kit in a text editor (TextEdit or Notepad). Select all of it, copy it, and paste it into the large box on GitHub.
4. Click **Commit changes** (twice, if GitHub asks again). The build starts.

### B6. Later updates

To publish a new version of the app's page, make a fresh kit with Ingenium's builder, then upload only its `files_for_github/ingenium.html` to the same repository (**Add file**, **Upload files**, **Commit changes**). The build starts by itself, and the new version installs over the old one with your data kept.

## 6. Install the app on the Fire tablet

1. On the tablet, open **Silk Browser** and sign in at github.com. The repository is private, so GitHub releases its files only to you, signed in.
2. Open the repository's **Releases** page and tap **{APP_FILE}-Android-Fire.apk**. Use Wi-Fi for a large file.
3. When the download has finished, tap it. If the tablet refuses, open **Settings**, then **Security & Privacy**, then **Apps from Unknown Sources**, and allow Silk Browser (or the Files app). The names differ slightly between Fire OS versions.
4. Tap **Install**, then **Open**.

**Updates.** Install a newer build's file in the same way. It installs over the old app, and the app's data remains. This works because every build is signed with the same key, and every build carries a larger version number than the one before.

[[if !NEW]]
**Which build you have.** Tap **About** at the top right of the app (the round ⓘ key on a narrow screen). The version and the build number stand at the bottom of About, and again at the end of the Guide, for example "Version 3.0 · build 20261007.1". The Releases page lists the same number for each app. A matching number means the newest build is installed.

[[end]]
[[if MODEL]]
**Removing the built-in models.** Hiding one in the app keeps its space, because an installed app cannot shrink. To recover the space, install `{APP_FILE}-Android-Fire-no-model.apk` over the full app. Installing the full app again brings the models back.

[[end]]
## 7. The signing key (important)

The kit carries no signing key. A key is yours alone, and it never travels in a file that someone else could read. GitHub signs each build with the key you keep in your repository's **secrets**, which GitHub never shows to anyone, you included, once they are saved.

1. Make a key once, on your own device: in Ingenium, open **Fabrica**, then the app's shipping card, and press **Save this key (.p12)**. Choose a password of at least twelve characters. (A key you already have, a `.keystore` or `.p12` file, will do too.)
2. On github.com, open your repository, then **Settings**, **Secrets and variables**, **Actions**, and press **New repository secret** for each of these:
   * `ANDROID_KEYSTORE_B64`: the key file, written as text. On a Mac, open Terminal and type `base64 -i ` followed by the file (drag it in), then copy what it prints. On Windows, in PowerShell: `[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\to\key.p12"))`.
   * `ANDROID_KEYSTORE_PASSWORD`: the key's password.
   * `ANDROID_KEY_ALIAS` (only if your key has a name other than `app`, which is the name Fabrica gives it).
3. Build again (section 6). The build log says which key signed the app.

* Android installs an update only when it carries the same key as the installed app. A different key means uninstalling first, which deletes the data kept inside the app. So keep the key file and its password safe, for example on a USB stick, away from this computer.
* Anyone holding the key and its password could make an app that installs over yours. Never put the key file into the repository itself.
* With no key in the secrets, the build is signed with a throwaway key: it installs, but the next build will not install over it.

## 8. The built-in models (optional)

[[if MODEL]]
The built-in models are chosen in `mobile_models.json`, under `"android"`: a list of up to two. More would make the app file larger than GitHub's Releases page accepts (about 2 GB per file). Ingenium's own models carry a `lineup` field; the build checks that they agree with the list in the app's page, so leave those entries as they are. A model of your own choosing goes in the list without a `lineup` field.
[[end]]
[[if !MODEL]]
This app has no built-in model (`mobile_models.json` says `null` under `"android"`). To give it one, put a list with one entry there, using the fields below.
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

For a Fire tablet, choose a model of roughly 0.5B to 1.5B parameters in the Q4_K_M form (a file under about 1 GB). Larger models load slowly or not at all with 2 to 4 GB of memory. These figures are approximate.

[[if !NEW]]
## 8a. More models, from inside the app

The Models page needs no new build to gain models:

* **Ingenium's models.** The card at the top shows four houses: **Velox** (the fastest), **Scriba** (it thinks before it answers), **Magister** (the strongest) and **Faber** (the coding model). The two built-in models are Velox and Scriba. Tap **Install** on another, and the app downloads it from Hugging Face over Wi-Fi, checks it against its fixed fingerprint and keeps it. On this app, Magister and Faber are LFM2.5 2.6B (about 1.7 GB). On a tablet with 4 GB of memory or less, the page says it may not fit; it still installs if you ask.
* **Convert a model.** A model in another form (Hugging Face's safetensors, PyTorch's .bin, or MLX) becomes a GGUF on the tablet itself: choose all the files in the model's folder, choose a size, and tap **Convert**. A tablet converts slowly, so small models (up to about 1.5B parameters) suit it best; a computer does the same job much faster.
* **A computer's models.** A Mac mini or another computer running {APP_NAME} can lend its stronger models over your home Wi-Fi. On that computer, Settings, **Your models on every device**, switch on sharing; here, in the same card, enter the address and the pairing code it shows and tap **Connect**. The chat then uses that computer's models; the source row under the chat switches back to this device's own. If the computer's name does not work, use the number address it shows.

[[end]]
## 9. If something goes wrong

Open **Actions**, click the failed run, and click the step marked with a red cross to read what happened. To try again, click **Re-run jobs**, then **Re-run failed jobs**.

| Where it stopped | What to do |
| --- | --- |
| No build starts at all | Check that `.github/workflows/build-android.yml` exists at exactly that path (step B5). Under **Settings**, **Actions**, **General**, make sure actions are allowed. |
| **Read who the app is (app.json)** | `app.json` is missing or damaged. Upload it again from the kit. |
| **Get llama.cpp b11321**, or **Put the built-in model and the current page into the app** | A download failed. Re-run later. If it keeps failing, a model may have moved on Hugging Face; see section 8. |
| **Build the app** | Re-run once. If it fails again in the same way, a file was probably changed or uploaded incompletely; upload the kit again. |
| **Check the engine's processor parts are in the app** | The app was built without one of the engine's processor parts (one is built for each generation of ARM chip). Re-run once. If it fails again, upload `ingenium_android_project/app/src/main/cpp/CMakeLists.txt` and `ingenium_android_project/app/build.gradle` again from the kit. |
| **Install on an Android emulator...** | The app was built, but the test device could not run it. Re-run once. The part of that step's log headed "what the app said" explains why. |
| **Publish to the Releases page**, with a permission error (403) | Under **Settings**, **Actions**, **General**, **Workflow permissions**, choose **Read and write permissions**, click **Save**, then re-run. |
| A message that a runner or an action version is no longer supported | GitHub retires old versions over time. In the build file, `runs-on: ubuntu-24.04` may be changed to `ubuntu-latest`, and an action's `@v4` to the newest version listed on that action's own GitHub page. |
| The tablet reports "App not installed" | The installed app is newer or carries a different key. Install the newest build. If the key differs, uninstall first (this deletes the app's data). |
| No build minutes left | Wait for the next month (section 10). |

## 10. Costs

On a private repository, GitHub's free plan includes 2,000 build minutes a month. A Fire build uses approximately 25 of them. Keep the repository private: its files are your app's, and only you should see them. These are GitHub's terms at the time of writing and may change; the billing section of your GitHub account settings shows the current ones.

## 11. What was and was not checked

* {TESTED_ANDROID}
[[if NEW]]
* {APP_NAME}'s own page has not been built on GitHub yet. Its first build checks that the page opens on the test device.
[[end]]
* The app has not been tried on a physical Fire tablet, so its speed on your tablet is not yet known.
* GitHub renames buttons and pages from time to time. If a button named here is missing, look for the nearest equivalent.
