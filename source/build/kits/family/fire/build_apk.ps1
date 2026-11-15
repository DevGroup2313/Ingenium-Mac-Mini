# __APP_STAMP__  |  Copyright (c) __APP_YEAR__ __APP_OWNER__. All rights reserved.
# NO LICENCE IS GRANTED. No copying, adaptation, redistribution, reverse
# engineering or commercial use without the author's written permission.
# See LICENCE.txt. Every distributed copy carries a build marker.
# __APP_TITLE__: build the Fire tablet app, __APP_APK__, on this Windows PC.
# "Build the APK (Windows).bat" runs this file; you do not run it yourself.
# It needs Java 17 to 21 and the Android tools on THIS PC; Android Studio
# brings both. The first build also needs the internet, to fetch Gradle 8.7
# and the Android parts the project names. It takes the same steps as
# GitHub's build and signs the app with the same permanent key, kept in the
# folder "signing". Made by Fabrica.

$ErrorActionPreference = 'Continue'
$proj = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $proj
$log = Join-Path $proj 'build_log.txt'
Set-Content -LiteralPath $log -Value '' -Encoding UTF8
function Say([string]$t) { Write-Host $t; Add-Content -LiteralPath $log -Value $t -Encoding UTF8 }
function Finish([int]$code) { Say ''; if (-not $env:CI) { [void](Read-Host 'Press Enter to close') }; exit $code }

Say '__APP_TITLE__: building the Fire tablet app on this PC'
Say ("Started " + (Get-Date))
Say ''

foreach ($f in 'settings.gradle', 'build.gradle', 'app\build.gradle', 'app\src\main\AndroidManifest.xml', 'app\src\main\assets\__APP_HTML__', 'gradlew.bat', 'gradle\wrapper\gradle-wrapper.jar', 'gradle\wrapper\gradle-wrapper.properties') {
  if (-not (Test-Path -LiteralPath $f)) { Say "Missing piece: $f"; Say 'Unzip the whole package again, then run this again.'; Finish 1 }
}

# Java 17 to 21: the Android plugin needs 17 or later, and Gradle 8.7 runs on
# Java up to 21. Android Studio's own Java is used when no other one fits.
function JavaMajor([string]$dir) {
  $j = Join-Path $dir 'bin\java.exe'
  if (-not (Test-Path -LiteralPath $j)) { return 0 }
  $text = (& $j -version 2>&1 | Out-String)
  if ($text -match 'version "(\d+)(?:\.(\d+))?') {
    $a = [int]$Matches[1]
    if ($a -eq 1 -and $Matches[2]) { return [int]$Matches[2] }
    return $a
  }
  return 0
}
$cands = @()
if ($env:JAVA_HOME) { $cands += $env:JAVA_HOME }
$cands += "$env:ProgramFiles\Android\Android Studio\jbr", "$env:ProgramFiles\Android\Android Studio\jre", "$env:LOCALAPPDATA\Programs\Android Studio\jbr"
foreach ($v in 'JAVA_HOME_21_X64', 'JAVA_HOME_17_X64') { $x = [Environment]::GetEnvironmentVariable($v); if ($x) { $cands += $x } }
foreach ($g in "$env:ProgramFiles\Eclipse Adoptium\jdk-*", "$env:ProgramFiles\Java\jdk-*", "$env:ProgramFiles\Microsoft\jdk-*", "$env:ProgramFiles\Zulu\zulu-*") {
  $cands += @(Get-Item -Path $g -ErrorAction SilentlyContinue | Sort-Object Name -Descending | ForEach-Object { $_.FullName })
}
$jdk = $null
foreach ($c in $cands) { if ($c) { $m = JavaMajor $c; if ($m -ge 17 -and $m -le 21) { $jdk = $c; break } } }
if (-not $jdk) {
  Say 'No Java 17 to 21 was found on this PC.'
  Say ''
  Say 'The simplest way: install Android Studio from'
  Say '    https://developer.android.com/studio'
  Say 'open it once, so that it fetches the Android tools, then run this'
  Say 'again. Android Studio carries its own Java, which this build uses.'
  Say 'Or install Java 17 or 21 (for example Temurin, from https://adoptium.net).'
  Finish 1
}
$env:JAVA_HOME = $jdk
$env:Path = "$jdk\bin;$env:Path"
Say ("Java:          " + (JavaMajor $jdk) + " ($jdk)")

# The Android tools (the SDK), where Android Studio puts them.
$sdk = $null
foreach ($c in @($env:ANDROID_HOME, $env:ANDROID_SDK_ROOT, "$env:LOCALAPPDATA\Android\Sdk")) {
  if ($c -and (Test-Path -LiteralPath $c)) {
    if ((Test-Path (Join-Path $c 'platforms')) -or (Test-Path (Join-Path $c 'platform-tools')) -or (Test-Path (Join-Path $c 'build-tools')) -or (Test-Path (Join-Path $c 'cmdline-tools'))) { $sdk = $c; break }
  }
}
if (-not $sdk) {
  Say 'The Android tools (the Android SDK) were not found on this PC.'
  Say ''
  Say 'Install Android Studio from https://developer.android.com/studio and'
  Say 'open it once: its first screens fetch the Android tools. Then run this'
  Say 'again. (If you keep them somewhere else, set ANDROID_HOME to that folder.)'
  Finish 1
}
$env:ANDROID_HOME = $sdk
# local.properties is read as Latin-1: backslashes and colons escaped, other letters as \u codes.
$p = $sdk.Replace('\', '\\').Replace(':', '\:')
$p = -join ($p.ToCharArray() | ForEach-Object { if ([int]$_ -gt 126) { '\u{0:x4}' -f [int]$_ } else { [string]$_ } })
[IO.File]::WriteAllText((Join-Path $proj 'local.properties'), "sdk.dir=$p`n", (New-Object Text.UTF8Encoding $false))
Say "Android tools: $sdk"

$sdkm = Get-ChildItem -Path (Join-Path $sdk 'cmdline-tools\*\bin\sdkmanager.bat') -ErrorAction SilentlyContinue | Select-Object -First 1
if ($sdkm) {
  Say 'Checking the Android parts the project needs (Android 14, API 34)...'
  $yes = ("y`r`n" * 40)
  $yes | & $sdkm.FullName --licenses 2>&1 | Out-Null
  & $sdkm.FullName 'platforms;android-34' 'build-tools;34.0.0' 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) { Say '  (not fetched now; Gradle will fetch what it needs)' }
}

# One permanent key for every version of the app (see READ ME FIRST.txt).
$newKey = $false
if ((Test-Path 'signing\signing.properties') -or (Test-Path 'app\carpe-diem.keystore')) {
  Say 'Signing key:   the permanent key in the folder "signing"'
} else {
  Say "Making this app's permanent signing key (first build only)..."
  New-Item -ItemType Directory -Force -Path 'signing' | Out-Null
  $pw = [Guid]::NewGuid().ToString('N')
  $kt = Join-Path $jdk 'bin\keytool.exe'
  & $kt -genkeypair -noprompt -keystore 'signing\app.keystore' -storetype PKCS12 -storepass $pw -keypass $pw -alias app -keyalg RSA -keysize 2048 -validity 36500 -dname 'CN=__APP_TITLE__, O=__APP_OWNER__' 2>&1 | Out-Null
  if (($LASTEXITCODE -eq 0) -and (Test-Path 'signing\app.keystore')) {
    [IO.File]::WriteAllText((Join-Path $proj 'signing\signing.properties'), "storeFile=app.keystore`nstorePassword=$pw`nkeyAlias=app`nkeyPassword=$pw`n", (New-Object Text.UTF8Encoding $false))
    $newKey = $true
    Say 'Signing key:   made, in the folder "signing"'
  } else {
    Say 'The key could not be made. The app will be signed with this PC''s own'
    Say 'test key: it installs, but a later version will not install over it.'
  }
}
Say ''

Say 'Building. The first build fetches Gradle and the Android parts it needs'
Say 'and takes several minutes; the window may look idle...'
$clock = [Diagnostics.Stopwatch]::StartNew()
cmd /c "gradlew.bat --no-daemon :app:assembleRelease >>build_log.txt 2>&1"
$status = $LASTEXITCODE
Say ("The build took {0} minute(s), exit status {1}." -f [math]::Ceiling($clock.Elapsed.TotalMinutes), $status)
Say ''

$apk = Join-Path $proj 'app\build\outputs\apk\release\app-release.apk'
if (($status -eq 0) -and (Test-Path -LiteralPath $apk)) {
  $out = Split-Path -Parent $proj
  $dest = Join-Path $out '__APP_APK__'
  try { Copy-Item -LiteralPath $apk -Destination $dest -Force -ErrorAction Stop } catch { $dest = Join-Path $proj '__APP_APK__'; Copy-Item -LiteralPath $apk -Destination $dest -Force }
  Say 'SUCCESS.'
  Say "The app is:  $dest"
  Say ''
  Say 'Put it on the tablet as in Part 1 of READ ME FIRST.txt: copy it to the'
  Say "tablet's Download folder, tap it there, and allow the install."
  if ($newKey) {
    Say ''
    Say 'KEEP THE FOLDER "signing" (inside "Fire tablet project"). It holds this'
    Say "app's permanent key. Every later version must be signed with it, or the"
    Say 'tablet refuses the update. If you also build on GitHub, upload this'
    Say "folder into the repository's project first, so both use the same key."
  }
  if (-not $env:CI) { Start-Process explorer.exe -ArgumentList "/select,`"$dest`"" }
  Finish 0
}

Say 'The build did NOT finish, so no app was made.'
Say ''
$text = Get-Content -LiteralPath $log -Raw
if ($text -match '(?i)not accepted the license|accept the sdk license') {
  Say "The Android tools' licences have not been accepted on this PC."
  Say 'Open Android Studio, then File, Settings, Languages & Frameworks, Android'
  Say 'SDK. Under SDK Platforms tick Android 14 (API level 34), press Apply,'
  Say 'and accept the licences it shows. Then run this again.'
} elseif ($text -match '(?i)could not resolve|could not get|unknownhost|connection refused|timed out') {
  Say 'The build could not fetch what it needs. The first build needs the'
  Say 'internet; connect, then run this again.'
} elseif ($text -match '(?i)unsupported class file major version|requires java|incompatible java') {
  Say 'The build did not accept this Java. Install Java 17 or 21, or Android'
  Say 'Studio, and run this again.'
}
Say "The full build log is:  $log"
Say 'Its last lines name the cause:'
Say ''
Get-Content -LiteralPath $log -Tail 25 | ForEach-Object { Write-Host $_ }
Finish 1
