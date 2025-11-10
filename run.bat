@echo off
chcp 65001 >nul
title Scribd PDF Downloader

echo ========================================
echo    Scribd PDF Downloader
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

REM node_modules klasörünün varlığını kontrol et
if not exist "node_modules" (
    echo [BILGI] node_modules klasoru bulunamadi.
    echo [BILGI] Bagimliliklari yukleniyor...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo [HATA] Bagimliliklar yuklenemedi!
        echo [HATA] Lutfen Node.js'in kurulu oldugundan emin olun.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [BILGI] Bagimliliklar basariyla yuklendi!
    echo.
)

REM Node.js'in kurulu olup olmadığını kontrol et
where node >nul 2>&1
if errorlevel 1 (
    echo [HATA] Node.js bulunamadi!
    echo [HATA] Lutfen Node.js'i kurun: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Uygulamayı başlat
echo [BILGI] Uygulama baslatiliyor...
echo.
call npm start

REM Hata durumunda bekle
if errorlevel 1 (
    echo.
    echo [HATA] Uygulama calisirken bir hata olustu!
    echo.
    pause
)

