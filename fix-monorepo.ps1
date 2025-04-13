# Monorepo 结构修复脚本

Write-Host "开始修复 Monorepo 结构..." -ForegroundColor Green

# 1. 备份 src 目录
Write-Host "备份原始 src 目录..." -ForegroundColor Cyan
if (Test-Path "src_backup") {
    Write-Host "src_backup 目录已存在，跳过备份" -ForegroundColor Yellow
} else {
    if (Test-Path "src") {
        Copy-Item -Path "src" -Destination "src_backup" -Recurse
        Write-Host "备份完成: src → src_backup" -ForegroundColor Green
    } else {
        Write-Host "src 目录不存在，无需备份" -ForegroundColor Yellow
    }
}

# 2. 清理旧文件
Write-Host "移动 src 目录到 src_old..." -ForegroundColor Cyan
if (Test-Path "src") {
    if (Test-Path "src_old") {
        Write-Host "src_old 目录已存在，先删除" -ForegroundColor Yellow
        Remove-Item -Path "src_old" -Recurse -Force
    }
    Move-Item -Path "src" -Destination "src_old"
    Write-Host "移动完成: src → src_old" -ForegroundColor Green
} else {
    Write-Host "src 目录不存在，跳过移动" -ForegroundColor Yellow
}

# 3. 确保各个包目录存在
Write-Host "确保必要的目录结构存在..." -ForegroundColor Cyan
$directories = @(
    "apps/main/src",
    "apps/main/src/components",
    "apps/main/src/pages",
    "apps/main/src/layouts",
    "apps/main/src/mocks",
    "packages/core/src",
    "packages/ui/src",
    "packages/i18n/src"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "创建目录: $dir" -ForegroundColor Yellow
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
    }
}
Write-Host "目录结构检查完成" -ForegroundColor Green

# 4. 安装必要的依赖
Write-Host "更新项目依赖..." -ForegroundColor Cyan
Write-Host "注意: 依赖冲突需要手动解决，请查看错误提示并修改 package.json 文件" -ForegroundColor Yellow

# 5. 提示下一步操作
Write-Host "`nMonorepo 结构修复完成!" -ForegroundColor Green
Write-Host "`n下一步操作:" -ForegroundColor Cyan
Write-Host "1. 检查并修复 package.json 中的依赖冲突" -ForegroundColor White
Write-Host "2. 运行 'npm install' 安装依赖" -ForegroundColor White
Write-Host "3. 运行 'npm run dev' 启动应用" -ForegroundColor White
Write-Host "`n注意: 如果遇到 'react' 版本冲突，请确保所有包使用兼容的版本（如 React 18）" -ForegroundColor Yellow 