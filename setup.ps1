# Enterprise App 初始化脚本
# 用于设置项目结构并安装依赖

Write-Host "开始初始化 Enterprise App Monorepo..." -ForegroundColor Cyan

# 检查目录结构
$directories = @(
    "apps/main/src/components",
    "apps/main/src/layouts",
    "apps/main/src/pages",
    "apps/main/public",
    "packages/core/src/constants",
    "packages/core/src/hooks",
    "packages/core/src/utils",
    "packages/core/src/http",
    "packages/i18n/src/resources",
    "packages/i18n/src/i18n",
    "packages/ui/src/components"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        Write-Host "创建目录: $dir" -ForegroundColor Green
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
    }
}

# 设置主应用package.json
$mainPackageJson = @{
    name = "@enterprise-app/main"
    version = "1.0.0"
    private = $true
    scripts = @{
        dev = "vite"
        build = "vite build"
        preview = "vite preview"
        test = "vitest"
    }
    dependencies = @{
        "@enterprise-app/core" = "workspace:*"
        "@enterprise-app/i18n" = "workspace:*"
        "@enterprise-app/ui" = "workspace:*"
        "react" = "^18.2.0"
        "react-dom" = "^18.2.0"
        "react-router-dom" = "^6.14.0"
    }
    devDependencies = @{
        "@vitejs/plugin-react" = "^4.0.0"
        "vite" = "^4.4.0"
        "vitest" = "^0.32.0"
        "msw" = "^1.2.1"
    }
}

# 设置core包package.json
$corePackageJson = @{
    name = "@enterprise-app/core"
    version = "1.0.0"
    main = "src/index.js"
    dependencies = @{
        "axios" = "^1.4.0"
    }
    peerDependencies = @{
        "react" = "^18.2.0"
    }
}

# 设置i18n包package.json
$i18nPackageJson = @{
    name = "@enterprise-app/i18n"
    version = "1.0.0"
    main = "src/index.js"
    dependencies = @{
        "i18next" = "^23.1.0"
        "react-i18next" = "^13.0.0"
    }
    peerDependencies = @{
        "react" = "^18.2.0"
    }
}

# 设置ui包package.json
$uiPackageJson = @{
    name = "@enterprise-app/ui"
    version = "1.0.0"
    main = "src/index.js"
    dependencies = @{
        "@enterprise-app/i18n" = "workspace:*"
        "@mui/material" = "^5.13.6"
        "@mui/icons-material" = "^5.11.16"
        "@emotion/react" = "^11.11.1"
        "@emotion/styled" = "^11.11.0"
    }
    peerDependencies = @{
        "react" = "^18.2.0"
        "react-dom" = "^18.2.0"
    }
}

# 设置根package.json
$rootPackageJson = @{
    name = "enterprise-app"
    version = "1.0.0"
    private = $true
    workspaces = @(
        "apps/*",
        "packages/*"
    )
    scripts = @{
        dev = "npm run dev -w @enterprise-app/main"
        build = "npm run build -w @enterprise-app/main"
        test = "npm run test -w @enterprise-app/main"
        clean = "rm -rf node_modules && rm -rf apps/*/node_modules && rm -rf packages/*/node_modules"
    }
    packageManager = "npm@10.2.0"
}

# 将JSON对象转换为字符串并写入文件
function Write-PackageJson($path, $content) {
    if (-not (Test-Path (Split-Path -Parent $path))) {
        New-Item -Path (Split-Path -Parent $path) -ItemType Directory -Force | Out-Null
    }
    $content | ConvertTo-Json -Depth 10 | Set-Content -Path $path
    Write-Host "已创建: $path" -ForegroundColor Green
}

# 创建package.json文件
Write-PackageJson -path "apps/main/package.json" -content $mainPackageJson
Write-PackageJson -path "packages/core/package.json" -content $corePackageJson
Write-PackageJson -path "packages/i18n/package.json" -content $i18nPackageJson
Write-PackageJson -path "packages/ui/package.json" -content $uiPackageJson

# 检查是否需要备份和更新根package.json
if (Test-Path "package.json") {
    if (-not (Test-Path "package.json.backup")) {
        Copy-Item "package.json" -Destination "package.json.backup"
        Write-Host "已备份原始 package.json 到 package.json.backup" -ForegroundColor Yellow
    }
    
    # 更新根package.json（保留原有依赖）
    try {
        $existingPackageJson = Get-Content "package.json" | ConvertFrom-Json
        $existingDependencies = $existingPackageJson.dependencies
        $existingDevDependencies = $existingPackageJson.devDependencies
        
        # 合并依赖
        if ($existingDependencies) {
            $rootPackageJson.dependencies = $existingDependencies
        }
        if ($existingDevDependencies) {
            $rootPackageJson.devDependencies = $existingDevDependencies
        }
    }
    catch {
        Write-Host "读取原始package.json时出错，将使用默认配置" -ForegroundColor Red
    }
}

Write-PackageJson -path "package.json" -content $rootPackageJson

# 创建vite配置文件
$viteConfig = @"
// apps/main/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, '../../packages/core/src'),
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@i18n': path.resolve(__dirname, '../../packages/i18n/src')
    }
  },
  server: {
    port: 5173
  }
});
"@

$viteConfigPath = "apps/main/vite.config.js"
if (-not (Test-Path (Split-Path -Parent $viteConfigPath))) {
    New-Item -Path (Split-Path -Parent $viteConfigPath) -ItemType Directory -Force | Out-Null
}
$viteConfig | Set-Content -Path $viteConfigPath
Write-Host "已创建: $viteConfigPath" -ForegroundColor Green

# 创建入口文件
$mainJsx = @"
// apps/main/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"@

$appJsx = @"
// apps/main/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 示例页面组件
const HomePage = () => <div>欢迎使用 Enterprise App</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
"@

$cssContent = @"
/* apps/main/src/index.css */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
"@

$mainJsxPath = "apps/main/src/main.jsx"
$appJsxPath = "apps/main/src/App.jsx"
$cssPath = "apps/main/src/index.css"

if (-not (Test-Path (Split-Path -Parent $mainJsxPath))) {
    New-Item -Path (Split-Path -Parent $mainJsxPath) -ItemType Directory -Force | Out-Null
}

$mainJsx | Set-Content -Path $mainJsxPath
$appJsx | Set-Content -Path $appJsxPath
$cssContent | Set-Content -Path $cssPath

Write-Host "已创建入口文件" -ForegroundColor Green

# 创建各包的入口文件
$indexFiles = @{
    "packages/core/src/index.js" = @"
// Core package entry point
export * from './constants';
export * from './hooks';
export * from './utils';
export * from './http';
"@
    "packages/i18n/src/index.js" = @"
// i18n package entry point
export * from './i18n';
export * from './resources';
"@
    "packages/ui/src/index.js" = @"
// UI package entry point
export * from './components';
"@
}

foreach ($file in $indexFiles.Keys) {
    if (-not (Test-Path (Split-Path -Parent $file))) {
        New-Item -Path (Split-Path -Parent $file) -ItemType Directory -Force | Out-Null
    }
    $indexFiles[$file] | Set-Content -Path $file
    Write-Host "已创建: $file" -ForegroundColor Green
}

# 创建HTML模板
$htmlTemplate = @"
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"@

$htmlPath = "apps/main/index.html"
if (-not (Test-Path (Split-Path -Parent $htmlPath))) {
    New-Item -Path (Split-Path -Parent $htmlPath) -ItemType Directory -Force | Out-Null
}
$htmlTemplate | Set-Content -Path $htmlPath
Write-Host "已创建: $htmlPath" -ForegroundColor Green

Write-Host "`nEnterprise App Monorepo 初始化完成!" -ForegroundColor Cyan
Write-Host "`n下一步:" -ForegroundColor Yellow
Write-Host "1. 运行 'npm install' 安装依赖" -ForegroundColor Yellow
Write-Host "2. 运行 'npm run dev' 启动开发服务器" -ForegroundColor Yellow
Write-Host "`n如遇到依赖冲突问题，请检查package.json文件中的版本兼容性" -ForegroundColor Yellow 