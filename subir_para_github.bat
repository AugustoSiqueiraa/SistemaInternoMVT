@echo off
title Enviando Sistema Interno MVT para o GitHub
echo ========================================================
echo   MVT ADVOGADOS - ENVIANDO PROJETO PARA O GITHUB
echo ========================================================
echo.
cd /d "%~dp0"
"C:\Users\MVT Advogados\AppData\Local\MinGit\cmd\git.exe" remote set-url origin https://github.com/AugustoSiqueiraa/SistemaInternoMVT.git
"C:\Users\MVT Advogados\AppData\Local\MinGit\cmd\git.exe" branch -M main
echo Conectando ao GitHub...
"C:\Users\MVT Advogados\AppData\Local\MinGit\cmd\git.exe" push -u origin main
echo.
echo ========================================================
echo Se pediu usuario/senha ou token, insira acima.
echo ========================================================
pause
