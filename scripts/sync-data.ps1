# Data synchronization script
# Pull JSON data files from separate nexaVm-data repository

$dataRepoUrl = "https://github.com/junaid1109/nexaVm-data.git"
$tempDir = ".data-sync-temp"
$dataDir = "app/data"

Write-Host "🔄 Syncing data files from repository..." -ForegroundColor Cyan

# Check if temp directory exists
if (Test-Path $tempDir) {
    Write-Host "Cleaning up previous sync..." -ForegroundColor Yellow
    Remove-Item $tempDir -Recurse -Force
}

# Clone the data repository
Write-Host "📥 Cloning data repository..." -ForegroundColor Yellow
git clone --depth 1 $dataRepoUrl $tempDir

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to clone repository" -ForegroundColor Red
    exit 1
}

# Ensure data directory exists
if (!(Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
}

# Copy JSON files
Write-Host "📋 Copying JSON files..." -ForegroundColor Yellow
Get-ChildItem "$tempDir/*.json" -ErrorAction SilentlyContinue | ForEach-Object {
    Copy-Item $_.FullName "$dataDir/$($_.Name)" -Force
    Write-Host "  ✓ $($_.Name)" -ForegroundColor Green
}

# Cleanup
Write-Host "🧹 Cleaning up temporary files..." -ForegroundColor Yellow
Remove-Item $tempDir -Recurse -Force

Write-Host "✅ Data sync completed successfully!" -ForegroundColor Green
Write-Host "Files are ready in: $dataDir" -ForegroundColor Cyan
