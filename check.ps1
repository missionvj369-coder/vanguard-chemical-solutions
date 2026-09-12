$c=[IO.File]::ReadAllText('d:\vanguard chemicals\vanguard-complete.html')
Write-Host ('products:' + ([regex]::Matches($c,'\{n:')).Count)
foreach($k in 'construction','healthcare','oilgas','marine','industrial','special','clean','ferti'){Write-Host ($k + ':' + ([regex]::Matches($c,('c:\"'+$k+'\"'))).Count)}
