Add-Type -AssemblyName System.Drawing
$f = 'D:\vanguard chemicals\logo.png'
$src = [System.Drawing.Image]::FromFile($f)
$tw = 60; $th = [int]($tw * $src.Height / $src.Width)
$thumb = New-Object System.Drawing.Bitmap($tw, $th, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$gfx = [System.Drawing.Graphics]::FromImage($thumb)
$gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gfx.DrawImage($src, [System.Drawing.Rectangle]::new(0, 0, $tw, $th))
$gfx.Dispose()
$bb = $thumb.LockBits([System.Drawing.Rectangle]::new(0, 0, $tw, $th), [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$ptr = $bb.Scan0
$stride = $bb.Stride
$len = $stride * $th
$data = New-Object byte[] $len
[System.Runtime.InteropServices.Marshal]::Copy($ptr, [System.IntPtr]::Zero, $data, 0, $len)
$thumb.UnlockBits($bb)
$pxs = @()
for ($y = 0; $y -lt $th; $y++) {
    for ($x = 0; $x -lt $tw; $x++) {
        $off = $y * $stride + $x * 3
        $r1 = $data[$off + 2]
        $g1 = $data[$off + 1]
        $b1 = $data[$off]
        if ($g1 -gt 90 -and $g1 -gt $b1 -and $g1 -gt $r1 -and $g1 -gt ($b1 + 25)) {
            $pxs += [pscustomobject]@{ R = $r1; G = $g1; B = $b1 }
        }
    }
}
$thumb.Dispose()
$src.Dispose()
if ($pxs.Count -eq 0) {
    $thumb = New-Object System.Drawing.Bitmap($tw, $th, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $gfx = [System.Drawing.Graphics]::FromImage($thumb)
    $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gfx.DrawImage([System.Drawing.Image]::FromFile($f), [System.Drawing.Rectangle]::new(0, 0, $tw, $th))
    $gfx.Dispose()
    $bb = $thumb.LockBits([System.Drawing.Rectangle]::new(0, 0, $tw, $th), [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $ptr = $bb.Scan0
    $stride = $bb.Stride
    $data = New-Object byte[] ($stride * $th)
    [System.Runtime.InteropServices.Marshal]::Copy($ptr, [System.IntPtr]::Zero, $data, 0, $data.Length)
    $thumb.UnlockBits($bb)
    for ($y = 0; $y -lt $th; $y++) {
        for ($x = 0; $x -lt $tw; $x++) {
            $off = $y * $stride + $x * 3
            $pxs += [pscustomobject]@{ R = $data[$off + 2]; G = $data[$off + 1]; B = $data[$off] }
        }
    }
    $thumb.Dispose()
}
$idx = [Math]::Max(0, $pxs.Count - 1) / 2
$sR = $pxs | Sort-Object R
$sG = $pxs | Sort-Object G
$sB = $pxs | Sort-Object B
$medR = [Math]::Round($sR[$idx].R)
$medG = [Math]::Round($sG[$idx].G)
$medB = [Math]::Round($sB[$idx].B)
$hex = ('#{0:X2}{1:X2}{2:X2}' -f $medR, $medG, $medB)
$r = "LOGO_GREEN=$hex  RGB=$medR,$medG,$medB  N=$($pxs.Count)"
[IO.File]::WriteAllText("$env:TEMP\logo-green.txt", $r)
Write-Host $r

$sB = $pxs | Sort-Object B
$medR = [math]::Round($sR[$idx].R)
$medG = [math]::Round($sG[$idx].G)
$medB = [math]::Round($sB[$idx].B)
$hex = ("#{0:X2}{1:X2}{2:X2}" -f $medR, $medG, $medB)
$r = "LOGO_GREEN=$hex  RGB=$medR,$medG,$medB  N=$($pxs.Count)"
[IO.File]::WriteAllText("$env:TEMP\logo-green.txt", $r)
Write-Host $r
