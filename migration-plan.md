# 企业应用 Monorepo 迁移方案

## 项目结构

```
enterprise-app/
├── packages/               # 共享包
│   ├── ui/                 # UI 组件库
│   ├── core/               # 核心功能库
│   └── i18n/               # 国际化库
├── apps/                   # 应用
│   └── main/               # 主应用
└── ...
```

## 迁移步骤

### 1. 准备工作

- [x] 备份当前项目
- [x] 创建 Monorepo 基本结构
- [x] 更新根目录 package.json
- [x] 配置 pnpm 工作空间

### 2. 迁移共享包

#### UI 组件库

将 `src/components` 中的可复用组件迁移到 `packages/ui/src/components`:

```bash
# 创建目录结构
mkdir -p packages/ui/src/components packages/ui/src/theme

# 迁移组件
# 例如: Button, Form, Layout, DataDisplay, Navigation 等
```

#### 核心功能库

将 `src/services`, `src/utils`, `src/hooks` 等迁移到 `packages/core`:

```bash
# 创建目录结构
mkdir -p packages/core/src/api packages/core/src/store packages/core/src/utils packages/core/src/hooks

# 迁移 API 和服务
# 例如: api 客户端、redux store 配置等
```

#### 国际化库

将 `src/i18n` 迁移到 `packages/i18n`:

```bash
# 创建目录结构
mkdir -p packages/i18n/src/i18n packages/i18n/src/resources packages/i18n/src/hooks packages/i18n/src/constants

# 迁移国际化配置和资源
```

### 3. 迁移主应用

将当前应用迁移到 `apps/main`:

```bash
# 创建目录结构
mkdir -p apps/main/src/layouts apps/main/src/pages apps/main/src/store apps/main/src/mocks apps/main/public

# 迁移应用代码
# 例如: App.jsx, 布局、页面等
```

### 4. 更新导入路径

更新所有 import 语句，使用新的包名:

```javascript
// 旧版本
import Button from '../../components/Button';

// 新版本
import { Button } from '@enterprise-app/ui';
```

### 5. 启动和测试

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

## 注意事项

1. 确保所有共享包都有正确的 package.json 配置
2. 使用 workspace 依赖声明: `"@enterprise-app/ui": "workspace:*"`
3. 遵循语义化版本控制
4. 确保测试覆盖率
5. 统一代码规范和风格 