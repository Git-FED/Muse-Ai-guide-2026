param(
  [Parameter(Mandatory = $true)]
  [string]$InstallerPath
)

$signature = Get-AuthenticodeSignature -FilePath $InstallerPath
if ($signature.Status -ne 'Valid') {
  Write-Error "Installer signature status is $($signature.Status). Sign the artifact before distribution."
  exit 1
}

Write-Host "Valid Authenticode signature: $($signature.SignerCertificate.Subject)"
