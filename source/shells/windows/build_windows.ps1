# INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
# NO LICENCE IS GRANTED. See LICENCE.txt.
#
# Builds the Windows shell Fabrica fills (Ingenium 6.5), on Windows with Visual Studio's C++ tools: Shell.exe (64-bit,
# Windows 10 and 11), its stand-in icon with room kept for each app's own (make_ico.py), Microsoft's WebView2 loader
# linked in (the SDK from NuGet, the version below), and the C++ runtime inside, so it needs nothing installed but the
# WebView2 runtime Windows carries. On the device Fabrica writes an app's icon and files into a copy (modules/r170.js).
#   pwsh -File source/shells/windows/build_windows.ps1 <out folder>     -> <out>/win-shell.exe and win-shell-sdk.txt
param([Parameter(Mandatory = $true)][string]$Out)
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$w = Join-Path ([IO.Path]::GetTempPath()) ('winshell-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force $w | Out-Null
New-Item -ItemType Directory -Force $Out | Out-Null

# Visual Studio's C++ tools on the path (the Developer shell), unless they already are
if (-not (Get-Command cl.exe -ErrorAction SilentlyContinue)) {
  $vs = & "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe" -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
  if (-not $vs) { throw "Visual Studio's C++ tools are not on this computer" }
  Import-Module (Join-Path $vs 'Common7\Tools\Microsoft.VisualStudio.DevShell.dll')
  Enter-VsDevShell -VsInstallPath $vs -SkipAutomaticLocation -DevCmdArguments '-arch=x64 -host_arch=x64' | Out-Null
}

# Microsoft's WebView2 SDK: its headers and its loader, linked into the program
$ver = '1.0.2210.55'
$pkg = Join-Path $w 'webview2.zip'
Invoke-WebRequest -Uri "https://www.nuget.org/api/v2/package/Microsoft.Web.WebView2/$ver" -OutFile $pkg -UseBasicParsing
$sha = (Get-FileHash $pkg -Algorithm SHA256).Hash.ToLower()
Expand-Archive -Path $pkg -DestinationPath (Join-Path $w 'wv2') -Force
$inc = Join-Path $w 'wv2\build\native\include'
$lib = Join-Path $w 'wv2\build\native\x64\WebView2LoaderStatic.lib'
if (-not (Test-Path (Join-Path $inc 'WebView2.h'))) { throw "WebView2.h is not in the package" }
if (-not (Test-Path $lib)) { throw "WebView2LoaderStatic.lib is not in the package" }

python (Join-Path $here 'make_ico.py') (Join-Path $w 'shell.ico')
if ($LASTEXITCODE) { throw "make_ico.py failed" }
Copy-Item (Join-Path $here 'shell.rc') $w
Push-Location $w
try {
  & rc.exe /nologo /fo shell.res shell.rc
  if ($LASTEXITCODE) { throw "rc failed" }
  & cl.exe /nologo /O2 /EHsc /std:c++17 /MT /W3 /DUNICODE /D_UNICODE /D_WIN32_WINNT=0x0A00 /DWINVER=0x0A00 "/I$inc" `
      (Join-Path $here 'shell.cpp') shell.res /Fe:Shell.exe /link /SUBSYSTEM:WINDOWS /MANIFEST:EMBED `
      "/MANIFESTINPUT:$(Join-Path $here 'shell.manifest')" $lib `
      user32.lib ole32.lib shell32.lib shlwapi.lib advapi32.lib crypt32.lib comdlg32.lib version.lib uuid.lib
  if ($LASTEXITCODE) { throw "cl failed" }
} finally { Pop-Location }
Copy-Item (Join-Path $w 'Shell.exe') (Join-Path $Out 'win-shell.exe') -Force
Set-Content -Path (Join-Path $Out 'win-shell-sdk.txt') -Value "Microsoft.Web.WebView2 $ver (NuGet), sha256 $sha" -Encoding utf8
Get-Item (Join-Path $Out 'win-shell.exe') | Format-List Name, Length
