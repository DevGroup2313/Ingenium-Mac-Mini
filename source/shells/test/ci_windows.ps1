# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Run by .github/workflows/build-shells.yml on Windows, from the top of the repository: the Windows shell, filled by the
# page's own code (modules/r170.js, in Node) as Fabrica fills it on the device, unpacked, and opened: a test page (its
# icon as Windows shows the file, its storage kept from the first start to the second, a second start bringing the open
# window forward, a file saved), then The Forge's own page (13 MB).
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
node "$T/make_win.mjs" $M $Shell "$T/test_page.html" $I "$W\test.zip" com.yannieforest.shelltest.win "Shell Test" CarpeNative | Select-Object -Last 1 | ForEach-Object { say $_ }
node "$T/make_win.mjs" $M $Shell "$W\the_forge.html" $I "$W\forge.zip" com.yannieforest.theforge.wintest "The Forge" CarpeNative,pywebview | Select-Object -Last 1 | ForEach-Object { say $_ }
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

# $zip, what it is, the title of the first start (a pattern), of the second ('' for one start), the picture's name
function One([string]$zip, [string]$what, [string]$title1, [string]$title2, [string]$pic) {
  $D = Join-Path $W ('x-' + $pic); New-Item -ItemType Directory -Force $D | Out-Null
  Expand-Archive -Path $zip -DestinationPath $D -Force
  $exe = Get-ChildItem $D -Filter *.exe | Select-Object -First 1
  $notes = @(Get-ChildItem $D -Filter 'How to open*.txt').Count
  say "     $($exe.Name): $([math]::Round($exe.Length / 1MB, 1)) MB, how to open: $notes file"
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
  if ($title2) {   # a second start: the open window comes forward, and the second copy ends at once
    $second = Start-Process -FilePath $exe.FullName -PassThru
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
One "$W\test.zip" 'a test page in the Windows app Fabrica made' 'Shell Test run 1' 'Shell Test run 2' 'windows-test.png'
One "$W\forge.zip" "The Forge (13 MB page) in the Windows app Fabrica made" '[^"]*Forge[^"]*' '' 'windows-forge.png'
exit $script:fail
