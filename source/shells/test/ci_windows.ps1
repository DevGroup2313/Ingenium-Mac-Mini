# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Run by .github/workflows/build-shells.yml on Windows, from the top of the repository: the Windows shell, filled by the
# page's own code (modules/r170.js, in Node) as Fabrica fills it on the device, and opened: a test page (its icon as Windows
# shows the file, its storage kept from the first start to the second, a second start bringing the open window forward, a
# file saved), then The Forge's own page (13 MB).
# 7.24: what Fabrica makes is the app's own installer, "<App> Setup.exe". Its page is pressed through as a person would
# (the shell's -shell_setuptest, each screen pictured): installed just for me, the installed copy opening as the app and the
# Setup file as the installer, an update over it, uninstalled from Settings' own command with the saved work kept; then
# installed for everyone (the default) and uninstalled by Settings' quiet command with the saved work removed. Each time
# the program, installed.txt, the Start menu and desktop shortcuts (named as the app, its taskbar identity) and the entry in
# Settings, Apps (HKCU or HKLM) are read back, and each is gone after.
#   pwsh -File source/shells/test/ci_windows.ps1 <win-shell.exe> <out folder>
param([Parameter(Mandatory = $true)][string]$Shell, [Parameter(Mandatory = $true)][string]$Out)
$ErrorActionPreference = 'Continue'
$M = 'source/build/modules'; $I = 'source/shells/test/icons'; $T = 'source/shells/test'
$W = Join-Path $env:RUNNER_TEMP 'wintest'
Remove-Item -Recurse -Force $W -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $W | Out-Null
New-Item -ItemType Directory -Force $Out | Out-Null
$report = Join-Path $Out 'windows.txt'
Set-Content -Path $report -Value '' -Encoding utf8
function say([string]$s) { Write-Host $s; Add-Content -Path $report -Value $s -Encoding utf8 }
$script:fail = 0
$wv = (Get-ItemProperty 'HKLM:\SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}' -ErrorAction SilentlyContinue).pv
say "Windows: $((Get-CimInstance Win32_OperatingSystem).Caption) $([Environment]::OSVersion.Version), WebView2 runtime $wv"
python -c "import gzip,shutil;shutil.copyfileobj(gzip.open('source/build/apps/builtin/forge.html.gz'),open(r'$W\the_forge.html','wb'))"
node "$T/make_win.mjs" $M $Shell "$T/test_page.html" $I "$W\Shell Test Setup.exe" com.yannieforest.shelltest.win "Shell Test" CarpeNative "Ada Quill" | Select-Object -Last 1 | ForEach-Object { say $_ }
node "$T/make_win.mjs" $M $Shell "$W\the_forge.html" $I "$W\The Forge Setup.exe" com.yannieforest.theforge.wintest "The Forge" CarpeNative,pywebview "Ada Quill" | Select-Object -Last 1 | ForEach-Object { say $_ }
Add-Type -AssemblyName System.Drawing, System.Windows.Forms

function Report([string]$log) {
  if (Test-Path $log) { $l = Get-Content $log -Encoding utf8 | Where-Object { $_ -like 'SHELL_PAGETEST PAGE *' } | Select-Object -Last 1; if ($l) { return $l.Substring(20) } }
  return ''
}
function WaitFor([string]$log, [string]$what, [int]$sec) {
  $t = [DateTime]::Now.AddSeconds($sec)
  while ([DateTime]::Now -lt $t) { if ((Test-Path $log) -and (Select-String -Path $log -SimpleMatch $what -Quiet)) { return $true }; Start-Sleep 1 }
  return $false
}
function Shot([string]$file) {
  try {
    $b = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
    $bmp = New-Object System.Drawing.Bitmap $b.Width, $b.Height
    $g = [System.Drawing.Graphics]::FromImage($bmp); $g.CopyFromScreen($b.Location, [System.Drawing.Point]::Empty, $b.Size)
    $bmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
  } catch { Write-Host "no picture: $_" }
}
function Close-App($p) {   # as a person closes it: the window's close, then made to end if it will not
  if (-not $p.HasExited) { [void]$p.CloseMainWindow(); if (-not $p.WaitForExit(15000)) { Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue } }
}
function Start-App([string]$exe, [string]$log, [string]$save) {
  $env:SHELL_PAGETEST_LOG = $log
  if ($save) { $env:SHELL_PAGETEST_SAVE_DIR = $save } else { Remove-Item Env:SHELL_PAGETEST_SAVE_DIR -ErrorAction SilentlyContinue }
  $p = Start-Process -FilePath $exe -ArgumentList '-shell_pagetest' -PassThru
  Remove-Item Env:SHELL_PAGETEST_LOG -ErrorAction SilentlyContinue; Remove-Item Env:SHELL_PAGETEST_SAVE_DIR -ErrorAction SilentlyContinue
  return $p
}

# the Setup file, what it is, the title of the first start (a pattern), of the second ('' for one start), the picture's name
function One([string]$setup, [string]$what, [string]$title1, [string]$title2, [string]$pic) {
  $D = Join-Path $W ('x-' + $pic); New-Item -ItemType Directory -Force $D | Out-Null
  Copy-Item $setup $D -Force
  $exe = Get-Item (Join-Path $D (Split-Path $setup -Leaf))
  # 6.73: Windows reads the app's own name, file and version, written in place by Fabrica into the shell's version resource;
  # 7.24: the file is "<App> Setup.exe" and its own name the app's ("<App>.exe" once installed)
  $vi = (Get-Item $exe.FullName).VersionInfo; $want = $exe.Name -replace ' Setup\.exe$', ''
  if ($vi.FileDescription -eq $want -and $vi.ProductName -eq $want -and $vi.OriginalFilename -eq "$want.exe") {
    say "PASS ${what}: Windows reads its own name ($($vi.FileDescription), version $($vi.FileVersion), company $($vi.CompanyName)), not its file name" }
  else { say "FAIL ${what}: its name as Windows reads it: '$($vi.FileDescription)' / '$($vi.ProductName)' / '$($vi.OriginalFilename)'"; $script:fail = 1 }
  say "     $($exe.Name): $([math]::Round($exe.Length / 1MB, 1)) MB, one file: the app and its installer"
  try {   # the icon Windows shows for the file: the app's own, written in by Fabrica (the seal's colour beside its letter)
    $ic = [System.Drawing.Icon]::ExtractAssociatedIcon($exe.FullName); $bm = $ic.ToBitmap()
    $px = $bm.GetPixel([int]($bm.Width * 0.25), [int]($bm.Height * 0.5))
    if ($px.G -gt 70 -and $px.R -lt 80) { say "PASS ${what}: Windows shows the app's own icon for the file (rgb $($px.R),$($px.G),$($px.B))" }
    else { say "FAIL ${what}: the file's icon is not the app's (rgb $($px.R),$($px.G),$($px.B))"; $script:fail = 1 }
    $bm.Save((Join-Path $Out ($pic -replace '\.png$', '-icon.png')), [System.Drawing.Imaging.ImageFormat]::Png)
  } catch { say "FAIL ${what}: the file's icon could not be read: $_"; $script:fail = 1 }

  $log = Join-Path $W "$pic-1.log"; $save = Join-Path $W "saved-$pic"
  $p = Start-App $exe.FullName $log $save
  $null = WaitFor $log 'SHELL_PAGETEST DONE' 150
  Start-Sleep 2
  Shot (Join-Path $Out $pic)
  if ($title2) {   # a second start (as the app, --run): the open window comes forward, and the second copy ends at once
    $second = Start-Process -FilePath $exe.FullName -ArgumentList '--run' -PassThru
    $ended = $second.WaitForExit(15000)
    $mine = @(Get-Process | Where-Object { $_.Path -eq $exe.FullName })
    if ($ended -and $mine.Count -eq 1) { say "PASS ${what}: a second start brings the open window forward and ends (one copy running)" }
    else { say "FAIL ${what}: a second start: ended=$ended, copies running=$($mine.Count)"; $script:fail = 1 }
  }
  Close-App $p
  $r = Report $log
  if ($r -and $r -match ('"title":"' + $title1 + '"') -and $r -match '"storage":true' -and $r -match '"bridge":true' -and $r -match '"idb":true') {
    say "PASS ${what}, first start: its page, its storage and IndexedDB, the file saver: $r"
  } else {
    say "FAIL ${what}, first start: $(if ($r) { $r } else { '(no report)' })"; $script:fail = 1
    if (Test-Path $log) { Get-Content $log | Select-Object -Last 10 | ForEach-Object { say "     | $_" } }
  }
  $clip = Get-Content $log -ErrorAction SilentlyContinue | Where-Object { $_ -like 'SHELL_PAGETEST CLIP*' } | Select-Object -Last 1
  if ($clip -like '*CLIP ok*') { say "PASS ${what}: the clipboard, written and read back" } else { say "     (the clipboard, as WebView2 gives it to a page here: $clip)" }
  $saved = Join-Path $save 'shell-check.txt'
  if ((Test-Path $log) -and (Select-String -Path $log -SimpleMatch 'SHELL_PAGETEST SAVED shell-check.txt ok' -Quiet) -and (Test-Path $saved) -and ((Get-Content $saved -Raw) -eq 'saved by the page')) {
    say "PASS ${what}: the page saved a file, and it holds what the page gave"
  } else { say "FAIL ${what}: the page's file was not saved"; $script:fail = 1 }
  if (-not $title2) { return }

  $log2 = Join-Path $W "$pic-2.log"
  $p2 = Start-App $exe.FullName $log2 ''
  $null = WaitFor $log2 'SHELL_PAGETEST DONE' 150
  Start-Sleep 1
  Close-App $p2
  $r2 = Report $log2
  if ($r2 -and $r2 -match ('"title":"' + $title2 + '"') -and $r2 -notmatch '"kept":null') { say "PASS ${what}, second start: what the first start kept is there: $r2" }
  else { say "FAIL ${what}, second start: $(if ($r2) { $r2 } else { '(no report)' })"; $script:fail = 1 }
}
One "$W\Shell Test Setup.exe" 'a test page in the Windows app Fabrica made' 'Shell Test run 1' 'Shell Test run 2' 'windows-test.png'
One "$W\The Forge Setup.exe" "The Forge (13 MB page) in the Windows app Fabrica made" '[^"]*Forge[^"]*' '' 'windows-forge.png'

# ---------------- 7.24: the installer ----------------
$id = 'com.yannieforest.shelltest.win'; $nm = 'Shell Test'; $setup = Join-Path $W 'Shell Test Setup.exe'
$progs = [Environment]::GetFolderPath('Programs'); $cprogs = [Environment]::GetFolderPath('CommonPrograms')
$desk = [Environment]::GetFolderPath('Desktop'); $pdesk = [Environment]::GetFolderPath('CommonDesktopDirectory')
$meDir = Join-Path $env:LOCALAPPDATA "Programs\$nm"; $allDir = Join-Path $env:ProgramFiles $nm; $data = Join-Path $env:LOCALAPPDATA $id
$keyMe = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\$id"; $keyAll = "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\$id"
$wsh = New-Object -ComObject WScript.Shell
$admin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
say "the installer: this account is an administrator: $admin"

function Code([string]$exe, [string]$argline) {   # the program's exit code, without waiting for what it leaves running
  $p = Start-Process -FilePath $exe -ArgumentList $argline -PassThru -WindowStyle Hidden
  $null = $p.Handle
  if (-not $p.WaitForExit(180000)) { Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue; return -1 }
  return $p.ExitCode
}
# the page pressed through by the shell itself (-shell_setuptest), each screen pictured while it holds
function SetupUi([string]$exe, [string]$argline, [string]$do, [string]$tag) {
  $log = Join-Path $W "setup-$tag.log"; Remove-Item $log -ErrorAction SilentlyContinue
  $env:SHELL_SETUPTEST_LOG = $log; $env:SHELL_SETUPTEST_DO = $do
  $null = Start-Process -FilePath $exe -ArgumentList ("-shell_setuptest " + $argline).Trim() -PassThru
  Remove-Item Env:SHELL_SETUPTEST_LOG, Env:SHELL_SETUPTEST_DO -ErrorAction SilentlyContinue
  $seen = 0; $t = [DateTime]::Now.AddSeconds(300)
  while ([DateTime]::Now -lt $t) {
    $lines = @(if (Test-Path $log) { Get-Content $log -Encoding utf8 } else { @() })
    $shots = @($lines | Where-Object { $_ -like 'SHELL_SETUPTEST SCREEN *' })
    while ($seen -lt $shots.Count) {
      $name = ($shots[$seen] -split ' ')[2]; Start-Sleep -Milliseconds 900; Shot (Join-Path $Out "setup-$tag-$name.png")
      say "     $tag, screen $name`: $($shots[$seen].Substring(24 + $name.Length))"; $seen++
    }
    if (@($lines | Where-Object { $_ -like 'SHELL_SETUPTEST DONE *' -or $_ -like 'SHELL_SETUPTEST FAIL *' }).Count) { break }
    Start-Sleep -Milliseconds 300
  }
  Start-Sleep 3
  return @(if (Test-Path $log) { Get-Content $log -Encoding utf8 } else { @() })
}
# the installer's window drawn, not blank: its violet keys, ring and pip counted in the picture (sampled every 3 pixels)
function Violet([string]$png) {
  if (-not (Test-Path $png)) { return -1 }
  $bm = New-Object System.Drawing.Bitmap $png; $n = 0
  for ($y = 0; $y -lt $bm.Height; $y += 3) { for ($x = 0; $x -lt $bm.Width; $x += 3) { $c = $bm.GetPixel($x, $y); if ($c.R -gt 80 -and $c.B -gt $c.R + 40 -and $c.B -gt $c.G + 60) { $n++ } } }
  $bm.Dispose(); return $n
}
function Lines([object[]]$lines, [string]$like) { return @($lines | Where-Object { $_ -like $like }) }
function Check([bool]$ok, [string]$pass, [string]$fail) { if ($ok) { say "PASS $pass" } else { say "FAIL $fail"; $script:fail = 1 } }
# an install read back: the program and installed.txt, its shortcuts, its taskbar identity, its entry in Settings, Apps
function Installed([string]$what, [string]$dir, [string]$start, [string]$dsk, [string]$key, [bool]$wantDesk) {
  $exe = Join-Path $dir "$nm.exe"; $mark = Join-Path $dir 'installed.txt'
  $mk = if (Test-Path $mark) { Get-Content $mark -Raw } else { '' }
  Check ((Test-Path $exe) -and $mk -match [regex]::Escape("id=$id")) "${what}: the program and installed.txt in $dir" "${what}: no program or installed.txt in $dir ($mk)"
  $sl = Join-Path $start "$nm.lnk"; $dl = Join-Path $dsk "$nm.lnk"
  Check ((Test-Path $sl) -and $wsh.CreateShortcut($sl).TargetPath -eq $exe) "${what}: the Start menu shortcut, named $nm, opens $exe" "${what}: the Start menu shortcut $sl"
  if ($wantDesk) { Check ((Test-Path $dl) -and $wsh.CreateShortcut($dl).TargetPath -eq $exe) "${what}: the desktop shortcut, named $nm" "${what}: the desktop shortcut $dl" }
  else { Check (-not (Test-Path $dl)) "${what}: no desktop shortcut, as chosen" "${what}: a desktop shortcut is there though unticked: $dl" }
  try {
    $sa = New-Object -ComObject Shell.Application; $item = $sa.Namespace($start).ParseName("$nm.lnk"); $aum = $item.ExtendedProperty('System.AppUserModel.ID')
    Check ($aum -eq $id) "${what}: the shortcut carries the app's taskbar identity ($aum)" "${what}: the shortcut's taskbar identity is '$aum'"
  } catch { say "     (${what}: the shortcut's taskbar identity could not be read: $_)" }
  $k = Get-ItemProperty $key -ErrorAction SilentlyContinue
  Check ($k -and $k.DisplayName -eq $nm -and $k.DisplayVersion -eq '6.5' -and $k.Publisher -eq 'Ada Quill' -and $k.InstallLocation -eq $dir -and
         $k.UninstallString -eq "`"$exe`" --uninstall" -and $k.QuietUninstallString -eq "`"$exe`" --uninstall --silent" -and $k.EstimatedSize -gt 100 -and $k.NoModify -eq 1 -and $k.DisplayIcon -eq "$exe,0") `
    "${what}: Settings, Apps lists it ($($k.DisplayName) $($k.DisplayVersion), $($k.Publisher), $([math]::Round($k.EstimatedSize / 1024, 1)) MB, $($k.InstallDate))" `
    "${what}: its entry in Settings, Apps: $(if ($k) { $k | Select-Object DisplayName, DisplayVersion, Publisher, InstallLocation, UninstallString, QuietUninstallString, DisplayIcon, NoModify, NoRepair, EstimatedSize | ConvertTo-Json -Compress } else { 'none' })"
}
function Gone([string]$what, [string]$dir, [string]$start, [string]$dsk, [string]$key, [bool]$dataKept) {
  $t = [DateTime]::Now.AddSeconds(45); while ((Test-Path $dir) -and [DateTime]::Now -lt $t) { Start-Sleep 1 }
  Check (-not (Test-Path $dir)) "${what}: its folder is gone ($dir)" "${what}: its folder is still there: $(Get-ChildItem $dir -Name -ErrorAction SilentlyContinue)"
  Check (-not (Test-Path (Join-Path $start "$nm.lnk")) -and -not (Test-Path (Join-Path $dsk "$nm.lnk"))) "${what}: its shortcuts are gone" "${what}: a shortcut is left"
  Check (-not (Test-Path $key)) "${what}: its entry in Settings, Apps is gone" "${what}: its entry in Settings, Apps is left"
  if ($dataKept) { Check (Test-Path $data) "${what}: the saved work is kept ($data)" "${what}: the saved work is gone though it was to be kept" }
  else { Check (-not (Test-Path $data)) "${what}: the saved work is removed, as ticked" "${what}: the saved work is left: $data" }
}
function Title([string]$exe, [string]$argline) {   # the title of the window the program opens
  $p = if ($argline) { Start-Process -FilePath $exe -ArgumentList $argline -PassThru } else { Start-Process -FilePath $exe -PassThru }
  $t = [DateTime]::Now.AddSeconds(40); $title = ''
  while ([DateTime]::Now -lt $t -and -not $title) { Start-Sleep 1; $p.Refresh(); if ($p.HasExited) { break }; $title = $p.MainWindowTitle }
  Close-App $p; Start-Sleep 2
  return $title
}

# 1. just for me, through the installer's page
$l = SetupUi $setup '' 'install-me' 'me'
$first = Lines $l 'SHELL_SETUPTEST SCREEN choose *' | Select-Object -First 1
Check ($first -match '"scope":"all"' -and $first -match '"desk":true' -and $first -match '"tryit":true' -and $first -match '"errors":0' -and $first -match '"scrollbars":0' -and $first -match '"bar":"Shell Test Setup"') `
  "the installer opens on For everyone on this PC, the desktop shortcut ticked, Open without installing offered, no scroll bar, no page error" "the installer's first screen: $first"
Check ((Lines $l 'SHELL_SETUPTEST FINISHED 0').Count -eq 1 -and (Lines $l 'SHELL_SETUPTEST DONE *' | Select-Object -Last 1) -match '"screen":"installed"') `
  "Just for me, pressed through the page: installed, and the page says so" "Just for me through the page: $((Lines $l 'SHELL_SETUPTEST *') -join ' | ')"
$v = Violet (Join-Path $Out 'setup-me-choose.png')
Check ($v -gt 200) "the installer's window is drawn: its violet keys and ring are on the screen ($v samples)" "the installer's window looks blank in its picture ($v violet samples)"
Installed 'just for me' $meDir $progs $desk $keyMe $true
# 2. the installed copy opens as the app, the Setup file as the installer
$t1 = Title (Join-Path $meDir "$nm.exe") ''
Check ($t1 -eq $nm) "the installed program opens as the app ($t1)" "the installed program opened '$t1'"
$t2 = Title $setup ''
Check ($t2 -eq "$nm Setup") "the Setup file opens the installer ($t2), the app being installed" "the Setup file opened '$t2'"
# 3. an update over it, without the desktop shortcut
$c = Code $setup '--install --scope=me --desktop=0'
Check ($c -eq 0) "an update over it, from the command line (exit 0)" "an update over it: exit $c"
Installed 'the update' $meDir $progs $desk $keyMe $false
Check (@(Get-ChildItem $meDir -Name).Count -eq 2) "the update leaves one program and installed.txt" "after the update: $(Get-ChildItem $meDir -Name)"
# 4. uninstalled from Settings' own command (the installed program with --uninstall), the saved work kept
Check (Test-Path $data) "the app's saved work is there before uninstalling ($data)" "no saved work at $data before uninstalling"
$l = SetupUi (Join-Path $meDir "$nm.exe") '--uninstall' 'uninstall-keep' 'uninstall-me'
Check ((Lines $l 'SHELL_SETUPTEST FINISHED 0').Count -eq 1 -and (Lines $l 'SHELL_SETUPTEST DONE *' | Select-Object -Last 1) -match '"screen":"uninstalled"') `
  "uninstalled through the page, from a copy in %TEMP%" "uninstalling through the page: $((Lines $l 'SHELL_SETUPTEST *') -join ' | ')"
Gone 'uninstalled for me' $meDir $progs $desk $keyMe $true
$tmpCopy = Join-Path $env:TEMP "$id.uninstall"; $t = [DateTime]::Now.AddSeconds(45); while ((Test-Path $tmpCopy) -and [DateTime]::Now -lt $t) { Start-Sleep 1 }
Check (-not (Test-Path $tmpCopy)) "the uninstaller's copy in %TEMP% is gone after" "the uninstaller's copy is left: $tmpCopy"
# 5. for everyone (the default), through the page: here without Windows' administrator question, which needs a person, so only
#    where this account already has an administrator's rights (else the page would wait for a question no one can answer)
if ($admin) {
  $l = SetupUi $setup '' 'install-all' 'all'
  Check ((Lines $l 'SHELL_SETUPTEST FINISHED 0').Count -eq 1) "For everyone on this PC, pressed through the page: installed" "For everyone through the page: $((Lines $l 'SHELL_SETUPTEST *') -join ' | ')"
  Installed 'for everyone' $allDir $cprogs $pdesk $keyAll $true
  # 6. uninstalled by Settings' quiet command, the saved work removed with it
  $c = Code (Join-Path $allDir "$nm.exe") '--uninstall --silent --remove-data'
  Check ($c -eq 0) "uninstalled for everyone from the quiet command (exit 0)" "uninstalling for everyone: exit $c"
  Gone 'uninstalled for everyone' $allDir $cprogs $pdesk $keyAll $false
} else { say "     (this account has no administrator's rights here, so For everyone is not tried: Windows would ask a person)" }
# 7.62: $T is not used here: PowerShell's names ignore case, and the uninstall check above set $t to a time at this level
# 7.62: a page signed with a key the shell does not carry (a test key, shells/common/test): the shell refuses it before anything
# of it runs, and shows its own page in its place (modules/r352.js)
node source/shells/common/test/page_from_case.mjs source/shells/common/test/vectors.json "signed, as Fabrica made it" "$W\signed_test.html" | Out-Null
node "source/shells/test/make_win.mjs" $M $Shell "$W\signed_test.html" $I "$W\Tide Check Setup.exe" com.yannieforest.tidecheck.win "Tide Check" CarpeNative "Ada Quill" | Select-Object -Last 1 | ForEach-Object { say $_ }
$D = Join-Path $W 'x-refused'; New-Item -ItemType Directory -Force $D | Out-Null; Copy-Item "$W\Tide Check Setup.exe" $D -Force
$log = Join-Path $W 'refused.log'; Remove-Item $log -ErrorAction SilentlyContinue
$p = Start-App (Join-Path $D 'Tide Check Setup.exe') $log ''
if (WaitFor $log 'SHELL_PAGETEST DONE' 90) { Start-Sleep 2; Shot (Join-Path $Out 'windows-refused.png') }
Close-App $p
$r = ''; if (Test-Path $log) { $r = Get-Content $log -Encoding utf8 | Where-Object { $_ -like 'SHELL_PAGETEST REFUSED *' } | Select-Object -Last 1 }
if ($r -and $r -like '*is signed with a key this app does not know*' -and $r -like '*ING-SHELL-CHECK-1*') { say "PASS a page signed with a key the shell does not carry: refused before it ran, the shell's own page in its place: $($r.Substring(23))" }
else { say "FAIL a page signed with a key the shell does not carry: $(if ($r) { $r } else { '(no report)' })"; $script:fail = 1 }
# 7.63: what the door of an app for its owner alone needs (modules/r354.js): Web Crypto here, and a page that stops where its first
# script stops it (the title says what was found; the script after the stop never runs). As above, not $T: it holds a time here
node "source/shells/test/make_win.mjs" $M $Shell "source/shells/test/door_check.html" $I "$W\Door Check Setup.exe" com.yannieforest.doorcheck.win "Door Check" CarpeNative "Ada Quill" | Out-Null
$D = Join-Path $W 'x-door'; New-Item -ItemType Directory -Force $D | Out-Null; Copy-Item "$W\Door Check Setup.exe" $D -Force
$log = Join-Path $W 'door.log'; Remove-Item $log -ErrorAction SilentlyContinue
$p = Start-App (Join-Path $D 'Door Check Setup.exe') $log ''
[void](WaitFor $log 'SHELL_PAGETEST DONE' 90)
Close-App $p
$r = Report $log
if ($r -and $r -like '*"title":"Door check: crypto"*') { say "PASS the door's needs: Web Crypto in a secure context, and the page stops where its first script stops it: $r" }
else { say "FAIL the door's needs: $(if ($r) { $r } else { '(no report)' })"; $script:fail = 1 }
exit $script:fail
