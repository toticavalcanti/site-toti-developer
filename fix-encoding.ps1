# Fix UTF-8 double encoding
$inputFile = "c:\Users\totic\my_projects\nextjs\toti-portfolio\src\mockData.ts"
$content = Get-Content $inputFile -Raw -Encoding UTF8

# Map of incorrect characters to correct characters
$replacements = @{
    'Ã©' = 'é'
    'Ã¡' = 'á'
    'Ã³' = 'ó'
    'Ã­' = 'í'
    'Ãº' = 'ú'
    'Ã¢' = 'â'
    'Ãª' = 'ê'
    'Ã´' = 'ô'
    'Ã£' = 'ã'
    'Ãµ' = 'õ'
    'Ã§' = 'ç'
    'Ã ' = 'à'
    'Ã¨' = 'è'
    'Ãš' = 'Ú'
    'Ã‡' = 'Ç'
    'Ã' = 'É'
    'Ã"' = 'Ó'
    'â€"' = '—'
    'â€' = '–'
}

foreach ($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
}

# Save with UTF-8 encoding
$content | Set-Content $inputFile -Encoding UTF8 -NoNewline

Write-Host "Encoding fixed successfully!"
