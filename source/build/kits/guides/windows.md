# {APP_NAME} for Windows: build kit

Kit made on {DATE} by Ingenium's builder, from the Windows app's files ({BUILD_FILES}).

## In brief

1. **Way A (the easy one):** let GitHub build the Windows app. Upload this kit to a new private repository; about 10 minutes later the app waits on the repository's Releases page (section 3).
2. **Way B:** build it on the PC itself by double-clicking `Build Ingenium (Windows).bat` (section 4).
[[if !NEW]]
3. To use Ingenium at once without building anything, double-click `ingenium.html` in the folder `{APP_FILE}-for-Windows`. It runs in a browser, with the slower engine inside the page.
[[end]]

## 1. What this kit is

[[if NEW]]
This kit builds **{APP_NAME}** (app id `{APP_ID}`) as a Windows program: the page you made in Ingenium's Build editor, in its own window with its own name and its own data folder, so it never touches Ingenium's. It carries no built-in model.
[[end]]
[[if !NEW]]
This kit holds the Windows version of Ingenium and everything needed to build it. The program carries its own engine (llama.cpp's own build for Windows) and two built-in models ({MODEL_NAME}, about {MODEL_MB} MB together), so it is useful the moment it opens. The first answers quickly; the second thinks before it answers, and the chat shows its thinking. The engine runs models many times faster than the engine inside the page, opens model files of any size, and also uses the graphics chip where its Vulkan drivers allow.
[[end]]

## 2. What is in this kit

| Item | Purpose |
| --- | --- |
| `START_HERE.html` and `START_HERE.txt` | This guide, as a web page and as plain text |
| `{APP_FILE}-for-Windows\` | Everything GitHub (Way A) or the build file (Way B) needs: {FILE_COUNT} files |
| `{APP_FILE}-for-Windows\ingenium.html` | The whole app's page in one file |
| `{APP_FILE}-for-Windows\app.json` | Who the app is: its name, its id and its data folder |
| `{APP_FILE}-for-Windows\desktop_model.json` | The built-in models and their checksums[[if NEW]] (none for this app)[[end]] |
| `{APP_FILE}-for-Windows\engine_windows.json` | The engine (llama.cpp's own Windows build) and its checksum |
| `{APP_FILE}-for-Windows\.github\workflows\build-windows.yml` | The cloud build (Way A) |
| `{APP_FILE}-for-Windows\Build Ingenium (Windows).bat` | The build file for Way B |
| `{APP_FILE}-for-Windows\installer\Ingenium.iss` | The installer's recipe: the cloud build turns it into `{APP_FILE}-Setup.exe` with Inno Setup |
| `{APP_FILE}-for-Windows\tools\` | The build steps: the engine, the model, publishing |
| `build_file_copy\build-windows.yml.txt` | A visible copy of the cloud build file, in case the folder is missed |

## 3. Way A: let GitHub build it

### A1. Create the repository

1. Sign in at github.com. Click **+** at the top right, then **New repository**.
2. Give it a name, for example `{REPO_SUGGESTION}`.
3. Choose **Private**, so only you can see the files. Keep it private.
4. Leave the other settings as they are and click **Create repository**.

### A2. Upload the files

1. Right-click the kit's zip file and choose **Extract All**. Open the folder `{APP_FILE}-for-Windows`.
2. On the new repository's page, click **uploading an existing file**.
3. Select everything inside `{APP_FILE}-for-Windows`, including the `.github` folder, and drag it onto the page. In Edge or Chrome the `.github` folder uploads with the rest.
4. Wait until every file is listed, then click **Commit changes**.

If the `.github` folder did not upload, create the file by hand: click **Add file**, then **Create new file**, type `.github/workflows/build-windows.yml` as its name, paste the contents of `build_file_copy\build-windows.yml.txt`, and click **Commit changes**.

### A3. Watch the build

Click **Actions**. The run "Build {APP_NAME} for Windows" starts by itself and takes about 8 to 10 minutes (an estimate). A green tick means the program was built and passed its test: [[if MODEL]]its own engine had to answer a question with the first built-in model, and the second had to think before it answered[[end]][[if !MODEL]]its engine had to start[[end]].

### A4. Download and open the program

1. Click **Releases** (on the right of the repository's main page), then the newest release.
2. Download `{APP_FILE}-Setup.exe`, the installer. It needs nothing on the PC: no Python and no administrator password.[[if MODEL]] `{APP_FILE}-Windows-with-models.zip` (about {APP_MB} MB) holds the same installer with the two built-in models beside it, for a PC without internet: extract it and run the installer inside.[[end]] `{APP_FILE}-Windows-portable.zip` is the one-file `{APP_FILE}.exe`, which needs no installing; it opens more slowly, because it unpacks itself each time.
3. Double-click `{APP_FILE}-Setup.exe`. If Edge says the file is not commonly downloaded, choose **Keep**. If SmartScreen says "Windows protected your PC", click **More info**, then **Run anyway**: the installer has not been through a paid signing process.
4. It installs at once, with no questions, and ends with **Open {APP_NAME} now** ticked. {APP_NAME} then sits on the Desktop and in the Start menu with its own icon, and **Settings, Apps** lists it, so it can be removed there like any program.
5.[[if MODEL]] The first time it opens, it offers to download its two models (about 2 GB, once; a broken download carries on from where it stopped).[[end]] To update later, run a newer `{APP_FILE}-Setup.exe`. It never touches your chats, notes, settings or models, and an earlier Python version of {APP_NAME} on the PC is replaced in the same folder.

[[if !NEW]]
**Which build you have.** Tap **About** at the top right of the app (the round ⓘ key on a narrow screen). The version and the build number stand at the bottom of About, and again at the end of the Guide, for example "Version 3.0 · build 20261007.1". The Releases page lists the same number for each app. A matching number means the newest build is installed.

[[end]]
### Build minutes

On a private repository, GitHub's free plan includes 2,000 build minutes a month, and every minute on Windows counts twice. A build takes about 8 to 10 minutes (it builds, installs, tests, updates and removes the app), so it uses about 16 to 20 of the 2,000. A change to these guides starts no build. These are GitHub's terms at the time of writing and may change; the billing section of your GitHub account settings shows the current ones.

## 4. Way B: build it on this PC

### What you need

* Python 3.12 or 3.13. If it is missing, the build file offers to install Python 3.13, or you can install it from https://www.python.org/downloads/ (tick **Add python.exe to PATH**).
* An internet connection for the first build: it downloads the build tools, the engine (about 40 MB)[[if MODEL]] and the built-in models (about {MODEL_MB} MB)[[end]] once, and keeps them.

### Steps

1. Extract the zip first. The build file cannot run from inside a zip file.
2. Double-click `Build Ingenium (Windows).bat`. A window opens and prints each step.
3. At the end it tests the program's engine[[if MODEL]] with the built-in models[[end]], installs the program in your user folder (`AppData\Local\Programs\{APP_FILE}`) and puts a shortcut on your Desktop.

If a step cannot be done, the window says why in plain words, and `build_log.txt` in the folder holds the full record.

Way B uses llama.cpp's published Windows engine, which has no trainer, so the Models page's "Train a small model from zero" says the trainer is missing in a program built this way. The installer that GitHub builds (Way A) carries the trainer, which GitHub compiles from the same llama.cpp release.

## 5. If the window will not open

The program's window uses the Microsoft Edge WebView2 Runtime, which comes with Windows 11 and with updated Windows 10. If it is missing, install "Microsoft Edge WebView2 Runtime" from Microsoft's website and start the program again. `Run Ingenium (Windows).bat` opens the same window without building, and its console window stays open to show any fault.

## 6. Adding models

[[if !NEW]]
**Ingenium's models.** At the top of the Models page, the card "Ingenium's models" shows four houses: **Velox** (the fastest), **Scriba** (it thinks before it answers), **Magister** (a larger model for hard questions, chosen to suit this PC) and **Faber** (the coding model). The two built-in models are Velox and Scriba. Click **Install** on another, and the program downloads it from Hugging Face, checks it against its fixed fingerprint (its SHA-256 value) and keeps it; a download that stops resumes where it stopped. With 16 GB, Magister is Qwen3.5 9B (about 5.7 GB) and Faber is Mellum2.1 12B Thinking (about 8.1 GB); with about 24 GB, Faber is Gemma 4 26B A4B (about 14.4 GB), and with about 32 GB or more, Qwen3-Coder 30B-A3B (about 18.6 GB). With less memory, lighter models take their place. On a PC whose graphics chip the engine cannot use, Magister is Qwen3.5 4B. The figures shown for each model are its makers' own published results.

**Convert a model.** A model in another form (Hugging Face's safetensors, PyTorch's .bin or .pt, or MLX) becomes a GGUF here: choose all the files in the model's folder (or the folder itself), choose a size, and click **Convert**. The result matches what llama.cpp's own tools make, and is kept in the program's own folder.

[[end]]
**Your own models.** On the Models page, click the box that says **Drop a model file here, or click to choose**, and choose `.gguf` files. Each file is linked where it already is: nothing is copied, and removing a model from the program never deletes the file. If Ollama is installed, the same page offers the models Ollama has downloaded.

As a rough guide (an estimate), a model needs about its file size in memory plus a little more for its Memory setting. The Models page shows whether each model is likely to fit.

## 7. This PC and the phone and tablet apps

The Fire, iPhone and iPad apps are built on GitHub from their own kits. This PC helps with uploading those kits (Edge or Chrome uploads the `.github` folder with the rest) and with installing the iPhone and iPad app with Sideloadly.

**Lending this PC's models to your other devices.** In {APP_NAME}, Settings, **Your models on every device**, switch on **Share this computer's models**. It shows an address and a pairing code; enter them on the laptop, tablet or phone in the same card, under **Use another computer's models**, and press **Connect**. That device's chat then uses this PC's models over your home Wi-Fi, from another room. Keep {APP_NAME} open here; while sharing is on, the PC does not go to sleep by itself. If the PC asks whether {APP_NAME} may accept incoming connections (Windows Firewall, on private networks), allow it. Questions and replies go only to the computer you pair with, on the same network, and only devices with the code are answered. They are not encrypted, so share only on a network you trust, such as your home Wi-Fi. A short hello, with no code, tells devices on the network this computer's name and how many models it lends.

[[if !NEW]]
## 8. Your copy on GitHub

The repository `yabban-maker/Ingenium-Windows` holds the same files. Keep it private, so only you can see them (on GitHub: **Settings**, then **General**, then **Change visibility** at the bottom). When this kit was made, the newest work sat on the branch `claude/magical-darwin-ppq4pn`. To make it the main version:

1. Open https://github.com/yabban-maker/Ingenium-Windows and click **Pull requests**, then **New pull request**.
2. Set **base** to `main` and **compare** to `claude/magical-darwin-ppq4pn`.
3. Click **Create pull request** twice, then **Merge pull request** and **Confirm merge**.

[[end]]
## 9. If something goes wrong

| Problem | What to do |
| --- | --- |
| The cloud build shows a red cross | Click the run, then the failed step; its last lines name the cause. A failed test publishes nothing. |
| The build file stops early | It writes everything to `build_log.txt` and shows the last lines. The usual causes: a Python that is too new (install 3.12 or 3.13 beside it) or no connection. |
| The engine could not be downloaded | The program is built anyway and uses the slower engine inside the page. Run the build file again when online. |
| The window stays empty or closes at once | The program writes `ingenium_crash.log` beside itself when something fails. |

## 10. What was and was not checked

{TESTED_WINDOWS}
