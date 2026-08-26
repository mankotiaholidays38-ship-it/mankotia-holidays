@echo off
title Mankotia Holidays Launcher
echo ========================================================
echo        Starting Mankotia Holidays Development Servers
echo ========================================================
echo.

echo [1/2] Starting Python Backend (FastAPI on Port 8000)...
start "Mankotia Holidays Backend" cmd /k "cd /d ""%~dp0"" && .venv\Scripts\python.exe main.py"

echo [2/2] Starting React Frontend (Vite on Port 5173)...
start "Mankotia Holidays Frontend" cmd /k "cd /d ""%~dp0frontend"" && npm run dev"

echo.
echo Waiting 3 seconds for servers to initialize...
ping 127.0.0.1 -n 4 >nul

echo Opening website in browser...
start http://localhost:5173

echo.
echo All services launched! You can close this launcher window.
exit
