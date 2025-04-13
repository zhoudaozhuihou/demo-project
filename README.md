# Enterprise App - Monorepo

企业级应用Monorepo架构，包含主应用和可重用模块包。

## 项目结构

```
enterprise-app/
├── apps/                 # 应用程序
│   └── main/             # 主应用
│       ├── src/          # 主应用源码
│       │   ├── components/  # 应用特定组件
│       │   ├── layouts/     # 页面布局
│       │   ├── pages/       # 页面组件
│       │   ├── routes.jsx   # 路由配置
│       │   ├── App.jsx      # 主应用组件
│       │   └── main.jsx     # 应用入口
│       ├── package.json     # 主应用包配置
│       └── vite.config.js   # Vite配置
├── packages/             # 共享库和模块
│   ├── core/             # 核心功能包
│   │   ├── src/
│   │   │   ├── constants/   # 常量
│   │   │   ├── hooks/       # 自定义钩子
│   │   │   ├── http/        # HTTP客户端
│   │   │   └── utils/       # 工具函数
│   │   └── package.json
│   ├── i18n/             # 国际化包
│   │   ├── src/
│   │   │   ├── i18n/        # i18n配置
│   │   │   └── resources/   # 翻译资源
│   │   └── package.json
│   └── ui/               # UI组件库
│       ├── src/
│       │   └── components/  # 可重用UI组件
│       └── package.json
└── package.json          # 根包配置（工作区设置）
```

## 开发指南

### 安装依赖

```bash
# 安装所有工作区依赖
npm install
```

### 启动开发服务器

```bash
# 启动主应用开发服务器
npm run dev
```

### 构建应用

```bash
# 构建主应用
npm run build
```

### 运行测试

```bash
# 运行所有测试
npm test
```

## 依赖关系

- 主应用 (`@enterprise-app/main`) - 依赖所有共享包：
  - `@enterprise-app/core`
  - `@enterprise-app/ui`
  - `@enterprise-app/i18n`

- UI组件库 (`@enterprise-app/ui`) - 依赖：
  - `@enterprise-app/i18n`

- 核心功能包 (`@enterprise-app/core`) - 无内部依赖

- 国际化包 (`@enterprise-app/i18n`) - 无内部依赖

## 版本管理

所有包使用统一的版本号管理，由根目录下的 package.json 控制。

## 常见问题

### 版本冲突

如果遇到React版本冲突，请确保所有包使用兼容的React版本。推荐在根package.json中设置相同的版本。

### 工作区命令

- `npm run clean` - 清理所有node_modules
- `npm run lint` - 运行ESLint检查
- `npm run lint:fix` - 修复ESLint错误

## 贡献指南

1. 克隆仓库
2. 创建功能分支
3. 提交更改
4. 推送分支
5. 创建Pull Request
