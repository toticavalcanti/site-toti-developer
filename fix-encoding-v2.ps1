$inputFile = "c:\Users\totic\my_projects\nextjs\toti-portfolio\src\mockData.ts"

# Read file as UTF-8
$content = Get-Content $inputFile -Raw -Encoding UTF8

# Replace all problematic characters
$content = $content -replace 'Ã©', 'é'
$content = $content -replace 'Ã¡', 'á'
$content = $content -replace 'Ã³', 'ó'
$content = $content -replace 'Ã­', 'í'
$content = $content -replace 'Ãº', 'ú'
$content = $content -replace 'Ã¢', 'â'
$content = $content -replace 'Ãª', 'ê'
$content = $content -replace 'Ã´', 'ô'
$content = $content -replace 'Ã£', 'ã'
$content = $content -replace 'Ãµ', 'õ'
$content = $content -replace 'Ã§', 'ç'
$content = $content -replace 'Ã ', 'à'
$content = $content -replace 'Ã¨', 'è'
$content = $content -replace 'Ãº', 'ú'
$content = $content -replace 'Ã‡', 'Ç'
$content = $content -replace 'Ã', 'É'
$content = $content -replace 'Ã"', 'Ó'
$content = $content -replace 'ÃŠ', 'Ê'
$content = $content -replace 'Ã', 'Í'
$content = $content -replace 'Ãš', 'Ú'
$content = $content -replace 'Ã‚', 'Â'
$content = $content -replace 'Ã'', 'Õ'
$content = $content -replace 'Ã"', 'Ô'
$content = $content -replace 'Ã€', 'À'

# Write back with UTF-8 BOM
$Utf8NoBomEncoding = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($inputFile, $content, $Utf8NoBomEncoding)

Write-Host "Fixed encoding!"
