$folders = @(
    "src/app",
    "src/app/(dashboard)",
    "src/app/(dashboard)/containers",
    "src/app/(dashboard)/sites",
    "src/app/(dashboard)/databases",
    "src/app/(dashboard)/monitoring",
    "src/app/(dashboard)/deployments",
    "src/app/(dashboard)/settings",

    "src/app/api",
    "src/app/api/docker",
    "src/app/api/docker/containers",
    "src/app/api/system",
    "src/app/api/deploy",

    "src/components",
    "src/components/layout",
    "src/components/dashboard",
    "src/components/docker",
    "src/components/charts",
    "src/components/common",

    "src/services",
    "src/services/docker",
    "src/services/system",
    "src/services/deploy",
    "src/services/monitoring",
    "src/services/auth",

    "src/hooks",
    "src/lib",
    "src/styles",
    "src/types",
    "src/config"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

$files = @(
    "src/app/layout.tsx",
    "src/app/(dashboard)/page.tsx",

    "src/components/layout/sidebar.tsx",
    "src/components/layout/header.tsx",

    "src/components/dashboard/stats-card.tsx",
    "src/components/dashboard/container-list.tsx",

    "src/services/docker/client.ts",

    "src/app/api/docker/containers/route.ts"
)

foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
    }
}

Write-Host ""
Write-Host "✅ AxioPanel initialisé !" -ForegroundColor Green
Write-Host ""
Write-Host "Dossiers créés : $($folders.Count)"
Write-Host "Fichiers créés : $($files.Count)"
Write-Host ""