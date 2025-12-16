@echo off
title Thailand E-Visa Backend Server
color 0A

echo.
echo ========================================
echo   Thailand E-Visa Backend Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [1/3] Installing dependencies...
    echo.
    call npm install
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo [1/3] Dependencies already installed
    echo.
)

REM Check if .env file exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please create .env file first.
    pause
    exit
)

echo [2/3] Checking MongoDB connection...
echo.

echo [3/3] Starting server...
echo.
echo Server will start in development mode with auto-reload
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

npm run dev

pause
