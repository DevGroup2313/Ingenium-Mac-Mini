# __APP_STAMP__  |  Copyright (c) __APP_YEAR__ __APP_OWNER__. All rights reserved.
# NO LICENCE IS GRANTED. No copying, adaptation, redistribution, reverse
# engineering or commercial use without the author's written permission.
# See LICENCE.txt. Every distributed copy carries a build marker.
# __APP_TITLE__: build the Windows program and its installer on this PC.
# "Build __APP_TITLE__ (Windows).bat" runs this file; you do not run it
# yourself. It needs Python 3.12 on THIS PC (3.10 to 3.13 also work), the
# internet once (for the build tools, the same versions GitHub's build uses),
# and Inno Setup 6 for the installer. It takes the same steps as GitHub's
# build (.github/workflows/build-windows-app.yml). Made by Fabrica.

$ErrorActionPreference = 'Continue'
$proj = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $proj
$log = Join-Path $proj 'build_log.txt'
Set-Content -LiteralPath $log -Value '' -Encoding UTF8
function Say([string]$t) { Write-Host $t; Add-Content -LiteralPath $log -Value $t -Encoding UTF8 }
function Finish([int]$code) { Say ''; if (-not $env:CI) { [void](Read-Host 'Press Enter to close') }; exit $code }
function LastLines { Say ''; Say "The full build log is:  $log"; Say 'Its last lines name the cause:'; Say ''; Get-Content -LiteralPath $log -Tail 25 | ForEach-Object { Write-Host $_ } }

Say '__APP_TITLE__: building the Windows program and its installer on this PC'
Say ("Started " + (Get-Date))
Say ''

foreach ($f in '__APP_BASE__.spec', '__APP_BASE__.iss', '__APP_BASE___app.py', '__APP_HTML__', '__APP_BASE__.ico', '__APP_BASE__.png', 'quiet_console.py', 'BUILD_INFO.txt') {
  if (-not (Test-Path -LiteralPath $f)) { Say "Missing piece: $f"; Say 'Unzip the whole package again, then run this again.'; Finish 1 }
}

# The build number and the version, read from BUILD_INFO.txt as GitHub's build reads them.
$info = @{}
Get-Content -LiteralPath 'BUILD_INFO.txt' | ForEach-Object { if ($_ -match '^\s*([^:]+):\s*(.*)$') { $info[$Matches[1].Trim().ToLower()] = $Matches[2].Trim() } }
$pass = "$($info['pass'])" -replace '[^0-9]', ''
if (-not $pass) { $pass = '0' }
$stamp = "$($info['stamp'])"
if (-not $stamp) { $stamp = $pass }
function Part([string]$n) { if (-not $n) { return 0 }; return [math]::Min([int64]$n, 65535) }
$p = Part $pass
if ($stamp -match '^(\d{1,9})s(\d{1,9})$') { $numeric = "$(Part $Matches[1]).$(Part $Matches[2]).$p.0" } else { $numeric = "1.0.$p.0" }
$setupBase = [IO.Path]::GetFileNameWithoutExtension('__APP_ZIPWIN__') + '-Setup'
Say "Build $pass ($stamp), version $numeric"

# Python: 3.12 first, as GitHub's build uses; 3.10 to 3.13 also work.
$py = $null; $pyArgs = @(); $pyVer = $null
foreach ($c in @(@('py', '-3.12'), @('py', '-3.13'), @('py', '-3.11'), @('py', '-3.10'), @('python', ''))) {
  $exe = $c[0]; $a = @(); if ($c[1]) { $a += $c[1] }
  if (-not (Get-Command $exe -ErrorAction SilentlyContinue)) { continue }
  $v = (& $exe @a -c "import sys;print('%d.%d' % sys.version_info[:2])" 2>$null | Out-String).Trim()
  if (($LASTEXITCODE -eq 0) -and ($v -match '^3\.1[0-3]$')) { $py = $exe; $pyArgs = $a; $pyVer = $v; break }
}
if (-not $py) {
  Say 'Python 3.12 was not found on this PC.'
  Say ''
  Say 'Install it from https://www.python.org/downloads/ (Python 3.12). In its'
  Say 'installer, tick "Add python.exe to PATH". Then run this again.'
  Finish 1
}
Say "Python:      $pyVer"

# A private build environment beside the project, made once.
$vpy = Join-Path $proj '.buildenv\Scripts\python.exe'
$ok = $false
if (Test-Path -LiteralPath $vpy) { & $vpy -c "import sys" 2>$null; $ok = ($LASTEXITCODE -eq 0) }
if (-not $ok) {
  if (Test-Path -LiteralPath '.buildenv') { Remove-Item -LiteralPath '.buildenv' -Recurse -Force -ErrorAction SilentlyContinue }
  Say 'Creating a private build environment (one time)...'
  & $py @pyArgs -m venv .buildenv 2>&1 | Out-Null
  if (-not (Test-Path -LiteralPath $vpy)) { Say 'Could not create the build environment.'; LastLines; Finish 1 }
}

# The build tools, the same versions as GitHub's build.
Say 'Installing the build tools (a few minutes the first time)...'
cmd /c ".buildenv\Scripts\python.exe -m pip install --quiet --upgrade pip >>build_log.txt 2>&1"
cmd /c ".buildenv\Scripts\python.exe -m pip install @@PIP_ARGS@@ >>build_log.txt 2>&1"
if ($LASTEXITCODE -ne 0) {
  Say ''
  Say 'The build tools could not be installed.'
  $text = Get-Content -LiteralPath $log -Raw
  if ($text -match '(?i)no matching distribution|could not find a version') {
    Say 'No build tool exists yet for this Python. Install Python 3.12 from'
    Say 'https://www.python.org/downloads/ beside the one you have, then run'
    Say 'this again: the build looks for 3.12 first.'
  } elseif ($text -match '(?i)getaddrinfo|failed to establish a new connection|proxyerror|network is unreachable|timed out') {
    Say 'This step needs the internet once, to download the build tools.'
    Say 'Connect, then run this again.'
  }
  LastLines; Finish 1
}
Say ("PyInstaller: " + ((& $vpy -m PyInstaller --version 2>$null | Out-String).Trim()))
Say ''

Say 'Building the program. This takes a few minutes; the window may look idle...'
$clock = [Diagnostics.Stopwatch]::StartNew()
if (Test-Path -LiteralPath 'build') { Remove-Item -LiteralPath 'build' -Recurse -Force -ErrorAction SilentlyContinue }
if (Test-Path -LiteralPath 'dist') { Remove-Item -LiteralPath 'dist' -Recurse -Force -ErrorAction SilentlyContinue }
cmd /c ".buildenv\Scripts\python.exe -m PyInstaller --noconfirm --clean __APP_BASE__.spec >>build_log.txt 2>&1"
$status = $LASTEXITCODE
Say ("The build took {0} minute(s), exit status {1}." -f [math]::Ceiling($clock.Elapsed.TotalMinutes), $status)
$dir = Join-Path $proj 'dist\__APP_TITLE__'
$exeOut = Join-Path $dir '__APP_TITLE__.exe'
if (($status -ne 0) -or -not (Test-Path -LiteralPath $exeOut)) { Say ''; Say 'The build did NOT finish, so no program was made.'; LastLines; Finish 1 }
$files = @(Get-ChildItem -LiteralPath $dir -Recurse -File)
Say ("The program folder: {0} files, {1:N1} MB." -f $files.Count, (($files | Measure-Object Length -Sum).Sum / 1MB))
Say ''

# The installer, made with Inno Setup exactly as GitHub's build makes it.
$out = Split-Path -Parent $proj
try { $probe = Join-Path $out '.write_test'; Set-Content -LiteralPath $probe -Value '' -ErrorAction Stop; Remove-Item -LiteralPath $probe -ErrorAction SilentlyContinue } catch { $out = Join-Path $proj 'dist' }
$iscc = Get-ChildItem -Path "${env:ProgramFiles(x86)}\Inno Setup*\ISCC.exe", "$env:ProgramFiles\Inno Setup*\ISCC.exe", "$env:LOCALAPPDATA\Programs\Inno Setup*\ISCC.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $iscc) {
  Say 'SUCCESS: the program is made. Inno Setup 6 was not found on this PC, so'
  Say 'no installer was made.'
  Say ''
  Say "The program is:  $exeOut"
  Say 'It runs from that folder as it is. To make the installer, which puts'
  Say '__APP_TITLE__ in the Start menu and in Settings, Apps, install Inno Setup 6'
  Say 'from https://jrsoftware.org/isdl.php and run this again.'
  if (-not $env:CI) { Start-Process explorer.exe -ArgumentList "/select,`"$exeOut`"" }
  Finish 0
}
Say "Making the installer with $($iscc.FullName)..."
& $iscc.FullName /Qp "/DAppVersion=$stamp" "/DAppNumeric=$numeric" "/DProgramDir=$dir" "/DOutputDir=$out" "/DSetupName=$setupBase" (Join-Path $proj '__APP_BASE__.iss') 2>&1 | ForEach-Object { Add-Content -LiteralPath $log -Value "$_" -Encoding UTF8 }
$setup = Join-Path $out "$setupBase.exe"
if (($LASTEXITCODE -ne 0) -or -not (Test-Path -LiteralPath $setup)) { Say 'The installer could not be made.'; LastLines; Finish 1 }
Say 'SUCCESS.'
Say "The installer is:  $setup"
Say "The program is:    $exeOut"
Say ''
Say 'Open the installer to put __APP_TITLE__ on this PC: it goes in the Start menu'
Say 'and in Settings, Apps, from where it can be removed like any other program.'
Say 'The same installer works on your other Windows PCs.'
if (-not $env:CI) { Start-Process explorer.exe -ArgumentList "/select,`"$setup`"" }
Finish 0
