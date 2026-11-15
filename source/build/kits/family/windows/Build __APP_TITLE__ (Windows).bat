@echo off
rem __APP_STAMP__, Copyright (c) __APP_YEAR__ __APP_OWNER__. All rights reserved.
rem NO LICENCE IS GRANTED. See LICENCE.txt.
rem Builds the Windows program and its installer on this PC: double-click this file.
rem It runs build_windows.ps1, in the same folder, which says what it needs.
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build_windows.ps1"
set "CODE=%ERRORLEVEL%"
endlocal & exit /b %CODE%
