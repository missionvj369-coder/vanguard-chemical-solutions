$base = 'D:\vanguard chemicals'
foreach ($f in 'index.html','about.html','products.html','contact.html') {
    $h = [IO.File]::ReadAllText("$base\$f")
    $has = if ($h -match 'class="mhead"') { 'YES' } else { 'NO' }
    $logo = if ($h -match 'logo.png') { 'logo-yes' } else { 'logo-no' }
    $menu = if ($h -match 'id="mheadMenu"') { 'menu-yes' } else { 'menu-no' }
    $green = if ($h -match 'VANGUARD CHEMICAL') { 'brand-yes' } else { 'brand-no' }
    Write-Host "$f | mhead=$has | menu=$menu | logo=$logo | brand=$green"
}
