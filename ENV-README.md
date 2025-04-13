# 环境配置系统 - 使用说明

本项目使用Vite的环境变量系统，通过`.env`文件来管理不同环境(SIT, UAT, PPD, PROD)的配置。

## 环境文件结构

项目包含以下环境配置文件：

- `.env` - 基础环境变量，适用于所有环境
- `.env.development` - 开发环境配置（默认）
- `.env.sit` - SIT环境配置
- `.env.uat` - UAT环境配置
- `.env.ppd` - PPD(预生产)环境配置
- `.env.production` - 生产环境配置

## 环境变量说明

环境变量以`VITE_`开头，这样Vite才会将它们暴露给客户端代码：

```
# 应用基本信息
VITE_APP_ENV=环境名称(development/sit/uat/ppd/production)
VITE_APP_NAME=应用名称
VITE_APP_VERSION=应用版本
VITE_APP_DEBUG=调试模式(true/false)

# API配置
VITE_API_URL=API服务地址

# 功能特性开关
VITE_APP_FEATURE_NEW_UI=是否启用新UI(true/false)
VITE_APP_FEATURE_BETA=是否启用Beta功能(true/false)
VITE_APP_FEATURE_ANALYTICS=是否启用数据分析(true/false)
```

## 使用方法

### 1. 开发环境

默认情况下，`npm run dev`会使用`.env.development`配置。

您也可以通过以下命令指定使用其他环境：

```bash
# 使用SIT环境配置进行开发
npm run dev:sit

# 使用UAT环境配置进行开发
npm run dev:uat

# 使用PPD环境配置进行开发
npm run dev:ppd
```

### 2. 构建部署

项目支持针对不同环境进行构建：

```bash
# 构建SIT环境版本
npm run build:sit

# 构建UAT环境版本
npm run build:uat

# 构建PPD环境版本
npm run build:ppd

# 构建生产环境版本
npm run build:prod
```

### 3. 在代码中使用环境配置

在代码中通过`config/env.js`模块访问环境配置：

```javascript
import config from '../config/env';

// 应用信息
console.log('环境名称:', config.app.env);
console.log('调试模式:', config.app.debug);

// API地址
console.log('API地址:', config.api.url);

// 功能特性
console.log('启用新UI:', config.features.newUserInterface);
console.log('启用Beta功能:', config.features.betaFeatures);
console.log('启用数据分析:', config.features.analytics);

// 环境类型检查
if (config.isDev) {
  console.log('这是开发环境');
} else if (config.isTest) {
  console.log('这是测试环境');
} else if (config.isProd) {
  console.log('这是生产环境');
}
```

## 修改环境配置

若需添加新的环境变量，请按以下步骤操作：

1. 在所有`.env`文件中添加新变量
2. 在`src/config/env.js`中添加对应的读取代码
3. 重启开发服务器使变更生效

## 注意事项

- 所有暴露给客户端的环境变量都会被打包进最终代码，因此**不要**将敏感信息（如密钥、密码）放在环境变量中
- 若要添加仅在构建时使用的变量（不暴露给客户端），请不要以`VITE_`开头
- 修改`.env`文件后需要重启开发服务器才能生效 