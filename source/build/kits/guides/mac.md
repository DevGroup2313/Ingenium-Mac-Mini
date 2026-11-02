# {APP_NAME} for Mac ({CHIP}): build kit

Kit made on {DATE} by Ingenium's builder, from the Mac app's files ({BUILD_FILES}).

## In brief

1. **Way A (the easy one):** let GitHub build the Mac apps. Upload this kit to a new private repository; the apps then wait on the repository's Releases page (section 3). GitHub builds two apps, one after the other: one for Intel Macs and one for Macs with Apple silicon (M1 or newer, such as a Mac mini). Both need macOS 13.3 or newer.[[if ARM]] For a Mac mini, take the Apple silicon one.[[end]]
2. **Way B:** build the app on the Mac itself by double-clicking `Build Mac App.command` (section 4). This also suits older macOS versions, because it compiles the engine for the Mac it runs on.
[[if !NEW]]
3. To use Ingenium at once without building anything, double-click `ingenium.html` in the folder `{APP_FILE}-for-Mac`. It runs in a browser, with the slower engine inside the page.
[[end]]

## 1. What this kit is

[[if NEW]]
This kit builds **{APP_NAME}** (app id `{APP_ID}`) as a Mac app: the page you made in Ingenium's Build editor, in its own window with its own name and its own data folder, so it never touches Ingenium's. It carries no built-in model.
[[end]]
[[if !NEW]]
This kit holds the Mac version of Ingenium and everything needed to build it. The app carries its own engine (llama.cpp, compiled for the Mac) and two built-in models ({MODEL_NAME}, about {MODEL_MB} MB together), so it is useful the moment it opens. The first answers quickly; the second thinks before it answers, and the chat shows its thinking. The engine runs models many times faster than the engine inside the page, and it opens model files of any size.
[[if ARM]]

This kit's guide is written for a Mac with Apple silicon, such as a Mac mini. That app's engine runs the models on the Mac's graphics chip (Metal), which is normally much faster than the processor alone. Its larger memory also lets it hold larger models from Ingenium's list: with 16 GB, the Models page offers **Magister** (Qwen3.5 9B, about 5.7 GB) and **Faber**, the coding model (Mellum2.1 12B Thinking, about 8.1 GB), each installed with one click. With about 24 GB, Faber is Gemma 4 26B A4B (about 14.4 GB); with about 32 GB or more, it is Qwen3-Coder 30B-A3B (about 18.6 GB). The models fit by an estimate of the memory each one needs; the Models page shows the estimate for this Mac.
[[end]]
[[if !ARM]]

On an Intel Mac the engine uses the processor (the graphics chip is not used). Macs with Apple silicon, such as a Mac mini, have their own kit and app, which use the graphics chip.
[[end]]
[[end]]

## 2. What is in this kit

| Item | Purpose |
| --- | --- |
| `START_HERE.html` and `START_HERE.txt` | This guide, as a web page and as plain text |
| `{APP_FILE}-for-Mac/` | Everything GitHub (Way A) or the build script (Way B) needs: {FILE_COUNT} files |
| `{APP_FILE}-for-Mac/ingenium.html` | The whole app's page in one file |
| `{APP_FILE}-for-Mac/app.json` | Who the app is: its name, its id and its data folder |
| `{APP_FILE}-for-Mac/desktop_model.json` | The built-in model and its checksum[[if NEW]] (none for this app)[[end]] |
| `{APP_FILE}-for-Mac/.github/workflows/build-mac.yml` | The cloud build (Way A). Finder hides this folder; section 3 shows it. |
| `{APP_FILE}-for-Mac/Build Mac App.command` | The build script for Way B |
| `{APP_FILE}-for-Mac/tools/` | The build steps: the engine, the model, finishing the app, publishing |
| `build_file_copy/build-mac.yml.txt` | A visible copy of the cloud build file, in case the hidden folder is missed |

## 3. Way A: let GitHub build it

### A1. Create the repository

1. Sign in at github.com. Click **+** at the top right, then **New repository**.
2. Give it a name, for example `{REPO_SUGGESTION}`.
3. Choose **Private**, so only you can see the files. Keep it private.
4. Leave the other settings as they are and click **Create repository**.

### A2. Unzip the kit and show the hidden folder

1. Double-click the kit's zip file. Open the folder `{APP_FILE}-for-Mac`.
2. In Finder, press **Command**, **Shift** and **.** (full stop) together. The hidden folder `.github` appears. Press the same keys again later to hide it.

### A3. Upload the files

1. On the new repository's page, click **uploading an existing file**.
2. Select everything inside `{APP_FILE}-for-Mac`, including `.github`, and drag it onto the page.
3. Wait until every file is listed, then click **Commit changes**.

If the page refuses the `.github` folder, create the file by hand: click **Add file**, then **Create new file**, type `.github/workflows/build-mac.yml` as its name, paste the contents of `build_file_copy/build-mac.yml.txt`, and click **Commit changes**.

### A4. Watch the build

Click **Actions**. The run "Build {APP_NAME} for Mac" starts by itself. It builds the Intel app first and then the Apple silicon app. The first build of each compiles its engine and takes about 15 to 25 minutes; later builds take the engine from GitHub's build cache and take about 6 to 12 minutes each. Since version 3.2 the first build also compiles llama.cpp's trainer once (for Train a small model from zero), which adds a few more minutes. These times are estimates. A green tick means the app was built and passed its test: [[if MODEL]]its own engine had to answer a question with the first built-in model, and the second had to think before it answered[[end]][[if !MODEL]]its engine had to start[[end]].

### A5. Download and open the app

1. Click **Releases** (on the right of the repository's main page), then the newest release.
2. Download `{APP_FILE}-{ZIP_CHIP}.zip`, the app alone (about 30 MB), which is quick to download and unzip.[[if MODEL]] The first time it opens, it downloads its two built-in models (about 2 GB, once), shows the progress, and carries on from where it stopped if the connection drops. `{APP_FILE}-{ZIP_CHIP}-with-models.zip` (about {APP_MB} MB) holds everything in one file, for a Mac without internet; it needs about twice that much free space to unzip.[[end]][[if ARM]] The `Mac-Intel` files on the same page are for Intel Macs.[[end]][[if !ARM]] The `Mac-Apple-Silicon` files on the same page are for Macs with Apple silicon.[[end]]
3. Double-click the zip, then drag `{APP_FILE}.app` to Applications.
4. Open it as section 5 describes.

[[if !NEW]]
**Which build you have.** Tap **About** at the top right of the app (the round ⓘ key on a narrow screen). The version and the build number stand at the bottom of About, and again at the end of the Guide, for example "Version 3.0 · build 20261007.1". The Releases page lists the same number for each app. A matching number means the newest build is installed.

[[end]]
### Build minutes

On a private repository, GitHub's free plan includes 2,000 build minutes a month, and every minute on a Mac counts ten times. Each build makes two apps, so the first build uses roughly 300 to 500 of the 2,000 and later builds roughly 120 to 240. These are estimates. GitHub removes a build cache that has not been used for about a week, so a build after a longer pause compiles the engine again and costs as much as the first. A change to these guides starts no build. These are GitHub's terms at the time of writing and may change; the billing section of your GitHub account settings shows the current ones.

## 4. Way B: build it on this Mac

### What you need

* Apple's free command line tools. They bring Python 3 and the compiler the engine needs. The script checks for them first: if they are missing, macOS offers to install them; click **Install**, wait until it finishes, then run the script again. A Python from https://www.python.org/downloads/ works too, but is not needed.
* An internet connection for the first build: it downloads the build tools, the engine's source (about 30 MB)[[if MODEL]] and the built-in model (about {MODEL_MB} MB)[[end]] once, and keeps them.

### Steps

1. Move the folder `{APP_FILE}-for-Mac` to a place you keep, for example Documents.
2. Double-click `Build Mac App.command`. A Terminal window opens and prints each step. The first build compiles the engine (about 5 to 15 minutes); in GitHub's test on an Intel Mac with macOS 15 the whole first build took about 12 minutes. It then compiles llama.cpp's trainer, for Train a small model from zero; on a 4-core Linux computer this took about 2.5 minutes, so expect a few minutes on a Mac (an estimate). If the trainer does not compile, the app is still built; only that lesson is missing.
3. At the end the script tests the app's engine[[if MODEL]] with the built-in models[[end]] and places `{APP_FILE}.app` on your Desktop. On a Mac with Apple silicon it builds the Apple silicon app, with Metal.

### If the script will not start

macOS may refuse the script itself. The route that always works: open Terminal, type `cd` and a space, drag the folder `{APP_FILE}-for-Mac` onto the window, press Return, then type `bash "Build Mac App.command"` and press Return. `MACOS_IF_BLOCKED.txt` describes two more routes.

## 5. Opening the app the first time

The app has not been through Apple's paid checking service, so macOS may refuse to open it the first time. Open **System Settings**, then **Privacy & Security**, scroll down, and click **Open Anyway** beside the note about the app. On some macOS versions, right-clicking the app and choosing **Open** works instead. Apple has changed these steps over time, so the wording on your Mac may differ.

To take screenshots from the app's + menu, macOS asks once for **Screen Recording** permission (System Settings, Privacy & Security). If a screenshot shows only the desktop background, allow the app there and open it again.

## 6. Adding models

[[if !NEW]]
**Ingenium's models.** At the top of the Models page, the card "Ingenium's models" shows four houses: **Velox** (the fastest), **Scriba** (balanced; it thinks), **Magister** (a larger model for hard questions, chosen to suit this Mac) and **Faber** (the coding model). The two built-in models are ready at once. Click **Install** on another, and the app downloads it from Hugging Face, checks it against its fixed fingerprint (its SHA-256 value), and keeps it. A download that stops resumes where it stopped. The figures shown for each model are its makers' own published results.

[[end]]
[[if !NEW]]
**Convert a model.** A model in another form (Hugging Face's safetensors, PyTorch's .bin or .pt, or MLX) becomes a GGUF here: choose all the files in the model's folder (or the folder itself), choose a size, and click **Convert**. The result matches what llama.cpp's own tools make, and is kept in the app's own folder.

[[end]]
**Your own models.** On the Models page, click the box that says **Drop a model file here, or click to choose**. The Mac's own file window opens; choose `.gguf` files. Each file is linked where it already is: nothing is copied, and removing a model from the app never deletes the file. If Ollama is installed, the same page offers the models Ollama has downloaded.

As a rough guide (an estimate), a model needs about its file size in memory plus a little more for its Memory setting. The Models page shows whether each model is likely to fit.[[if ARM]] On a Mac mini with 16 GB, models up to about 9 GB on disk fit, with room left for the Mac itself.[[end]]

## 7. This Mac and the phone and tablet apps

The Fire, iPhone and iPad apps are built on GitHub from their own kits. This Mac helps with uploading those kits (show the hidden `.github` folder as in section 3) and with installing the iPhone and iPad app with Sideloadly.

**Lending this Mac's models to your other devices.** In {APP_NAME}, Settings, **Your models on every device**, switch on **Share this computer's models**. It shows an address and a pairing code; enter them on the laptop, tablet or phone in the same card, under **Use another computer's models**, and press **Connect**. That device's chat then uses this Mac's models over your home Wi-Fi, from another room. Keep {APP_NAME} open here; while sharing is on, the Mac does not go to sleep by itself. If the Mac asks whether {APP_NAME} may accept incoming connections or find devices on your local network, allow it. Questions and replies go only to the computer you pair with, on the same network, and only devices with the code are answered. They are not encrypted, so share only on a network you trust, such as your home Wi-Fi. A short hello, with no code, tells devices on the network this computer's name and how many models it lends.

[[if !NEW]]
## 8. Your copy on GitHub

The repository `yabban-maker/Ingenium-here` (private) holds the same files. Keep it private. When this kit was made, the newest work sat on the branch `claude/magical-darwin-ppq4pn`. To make it the main version:

1. Open https://github.com/yabban-maker/Ingenium-here and click **Pull requests**, then **New pull request**.
2. Set **base** to `main` and **compare** to `claude/magical-darwin-ppq4pn`.
3. Click **Create pull request** twice, then **Merge pull request** and **Confirm merge**.

[[end]]
## 9. If something goes wrong

| Problem | What to do |
| --- | --- |
| The cloud build shows a red cross | Click the run, then the failed step; its last lines name the cause. A failed test publishes nothing. |
| The build script stops early | It writes everything to `build_log.txt` in the folder and shows the last lines. The usual causes: no connection, missing command line tools, or a Python that is too new for the build tools (install 3.12 or 3.13 beside it, or remove the newer one from the path). A missing icon never stops it: the app is then built with the plain icon. |
| The engine does not compile on this Mac | The app is built anyway and uses the slower engine inside the page. The log above the message says why. |
| The app window stays empty or closes at once | The app writes `ingenium_crash.log` beside itself when something fails. |
| macOS refuses a file | See `MACOS_IF_BLOCKED.txt`. |

## 10. What was and was not checked

[[if ARM]]
{TESTED_MAC_ARM}
[[end]]
[[if !ARM]]
{TESTED_MAC}
[[end]]
