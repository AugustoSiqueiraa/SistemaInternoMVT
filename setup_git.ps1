param(
    [string]$RepoUrl = "https://github.com/AugustoSiqueiraa/SistemaInternoMVT.git"
)

$dest = "C:\Users\MVT Advogados\AppData\Local\MinGit"
$gitExe = "$dest\cmd\git.exe"

if (!(Test-Path $gitExe)) {
    Write-Host "Baixando MinGit portátil..."
    if (!(Test-Path $dest)) {
        New-Item -ItemType Directory -Path $dest -Force | Out-Null
    }
    $zipPath = "$env:TEMP\mingit.zip"
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/MinGit-2.43.0-64-bit.zip" -OutFile $zipPath
    Write-Host "Extraindo MinGit..."
    Expand-Archive -Path $zipPath -DestinationPath $dest -Force
    Remove-Item $zipPath -Force
}

Write-Host "Git pronto:"
& $gitExe --version

# Configura o repositório no diretório de trabalho
$repoDir = "c:\Users\MVT Advogados\OneDrive\Área de Trabalho\Teste"
Set-Location $repoDir

if (!(Test-Path "$repoDir\.git")) {
    & $gitExe init
    & $gitExe config user.name "AugustoSiqueiraa"
    & $gitExe config user.email "augusto@mvtadvogados.com.br"
    & $gitExe remote add origin $RepoUrl
} else {
    & $gitExe remote set-url origin $RepoUrl
}

& $gitExe add -A
& $gitExe commit -m "feat: Sistema Interno MVT Advogados - Gestao de Reunioes e Anti No-Show"
Write-Host "Tentando push para $RepoUrl..."
& $gitExe branch -M main
& $gitExe push -u origin main
