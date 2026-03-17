@echo off
cd /d "C:\Users\User\Desktop\zru-website"
if "%PORT%"=="" set PORT=3000
node_modules\.bin\next dev --port %PORT%
