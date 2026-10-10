@echo off
echo ==============================================
echo  MVT Advogados - Salvando no GitHub Automatico
echo ==============================================
echo.

set PATH=%PATH%;C:\Users\MVT Advogados\AppData\Local\MinGit\cmd;C:\Program Files\Git\bin;C:\Program Files\Git\cmd
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] O Git nao foi encontrado no sistema.
    echo Baixe e instale o Git pelo link: https://git-scm.com/download/win
    pause
    exit /b
)

echo Adicionando arquivos...
git add .

echo.
echo Criando commit...
git commit -m "feat: Integracao Supabase em nuvem, tabelas reunioes e historico, sincronizacao automatica"

echo.
echo Enviando para o GitHub (pode pedir senha)...
git push origin main

echo.
echo ==============================================
echo PRONTO! Arquivos enviados com sucesso!
echo ==============================================
pause
