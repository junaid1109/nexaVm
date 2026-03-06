$logos = @("nrsp.jpg","1772523171012-utxusd.png","milano.png","thux.png","1770805572759-dy081r.jpg","1772523192695-e23v2q.webp","1772523240363-lyjnm.png","1772523259264-hl035.jpg","1772523269330-5ncmzb.png","1772523283174-7z9ywg.webp","1772523309446-vpln8j.png","1772523441875-tibgmg.png","1772523457040-4lvdnv.png","1772523651935-49i61.jpeg","1772523665446-0m5ys.png","1772523742035-dcd8xd.webp","1772523867676-a8pbap.jpeg","1772523916259-m6r03.png","1772524210129-821wrh.jpeg","1772524222968-rrptt.jpeg","1772524249227-tb9uq4.png","1772524336978-e00wbo.jpg")

$downloadPath = "d:\xampp\htdocs\project\sanq\nex\Website-main\public\img\customers\new"

foreach ($logo in $logos) {
  $url = "https://nexavm.com/img/customers/$logo"
  $filePath = Join-Path $downloadPath $logo
  Write-Host "Downloading: $logo"
  try {
    Invoke-WebRequest -Uri $url -OutFile $filePath
    Write-Host "✓ Downloaded: $logo"
  } catch {
    Write-Host "✗ Failed: $logo"
  }
}

Write-Host "Download complete!"
