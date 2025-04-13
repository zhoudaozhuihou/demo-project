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
│       │   ├── mocks/       # 模拟数据
│       │   ├── routes.jsx   # 路由配置
│       │   ├── App.jsx      # 主应用组件
│       │   ├── main.jsx     # 应用入口
│       │   └── theme.js     # 主题配置
│       ├── public/          # 静态资源
│       ├── package.json     # 主应用包配置
│       ├── index.html       # HTML模板
│       └── vite.config.js   # Vite配置
├── packages/             # 共享库和模块
│   ├── core/             # 核心功能包
│   │   ├── src/
│   │   │   ├── constants/   # 常量
│   │   │   ├── hooks/       # 自定义钩子
│   │   │   ├── http/        # HTTP客户端
│   │   │   ├── utils/       # 工具函数
│   │   │   └── index.js     # 导出文件
│   │   └── package.json
│   ├── i18n/             # 国际化包
│   │   ├── src/
│   │   │   ├── i18n/        # i18n配置
│   │   │   ├── resources/   # 翻译资源
│   │   │   │   ├── locales/ # 语言文件
│   │   │   │   │   ├── en/  # 英文翻译
│   │   │   │   │   ├── zh/  # 中文翻译
│   │   │   │   │   └── es/  # 西班牙语翻译
│   │   │   │   └── index.js # 资源入口
│   │   │   └── index.js     # 导出文件
│   │   └── package.json
│   └── ui/               # UI组件库
│       ├── src/
│       │   ├── components/  # 可重用UI组件
│       │   │   ├── LanguageSwitcher/ # 语言切换组件
│       │   │   ├── Button/  # 按钮组件
│       │   │   ├── Feedback/ # 反馈组件
│       │   │   ├── Navigation/ # 导航组件
│       │   │   ├── Routes/  # 路由组件
│       │   │   └── index.js # 组件导出
│       │   └── index.js     # 导出文件
│       └── package.json
├── public/               # 公共静态资源
├── pnpm-workspace.yaml   # PNPM工作区配置
└── package.json          # 根包配置（工作区设置）
```

## 开发指南

### 安装依赖

```bash
# 安装所有工作区依赖
npm install

# 或使用PNPM（推荐）
pnpm install
```

### 启动开发服务器

```bash
# 启动主应用开发服务器
npm run dev

# 启动特定环境的开发服务器
npm run dev:sit  # SIT环境
npm run dev:uat  # UAT环境
npm run dev:ppd  # 预生产环境
```

### 构建应用

```bash
# 构建主应用
npm run build

# 构建特定环境
npm run build:sit   # SIT环境
npm run build:uat   # UAT环境
npm run build:ppd   # 预生产环境
npm run build:prod  # 生产环境
```

### 运行测试

```bash
# 运行所有测试
npm test

# 运行测试并观察变化
npm run test:watch

# 运行测试覆盖率报告
npm run test:coverage
```

## 多语言支持

项目支持以下语言：

- 英文 (en)
- 中文 (zh)
- 西班牙语 (es)

翻译文件位于 `packages/i18n/src/resources/locales/` 目录下，按语言和模块分类。

## 依赖关系

- 主应用 (`apps/main`) - 依赖所有共享包：
  - `@enterprise-app/core`
  - `@enterprise-app/ui`
  - `@enterprise-app/i18n`

- UI组件库 (`@enterprise-app/ui`) - 依赖：
  - `@enterprise-app/i18n`

- 核心功能包 (`@enterprise-app/core`) - 无内部依赖

- 国际化包 (`@enterprise-app/i18n`) - 无内部依赖

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 4
- **UI框架**: Material UI 7
- **状态管理**: Redux Toolkit
- **路由**: React Router 7
- **HTTP客户端**: Axios
- **国际化**: i18next
- **测试**: Vitest
- **包管理**: PNPM
- **样式**: Emotion & Tailwind CSS
- **代码质量**: ESLint & Prettier
- **Git钩子**: Husky & lint-staged
- **API模拟**: MSW (Mock Service Worker)

## 环境配置

项目支持多环境配置，环境变量文件：

- `.env` - 基础环境变量
- `.env.development` - 开发环境
- `.env.sit` - SIT测试环境
- `.env.uat` - UAT测试环境
- `.env.ppd` - 预生产环境
- `.env.production` - 生产环境

## 常见问题

### 依赖版本冲突

如果遇到依赖版本冲突，请确保所有包使用兼容的版本。建议在根package.json中设置工作区共享依赖。

### 工作区命令

- `npm run clean` - 清理所有node_modules
- `npm run lint` - 运行ESLint检查
- `npm run lint:fix` - 修复ESLint错误
- `npm run format` - 使用Prettier格式化代码

## 贡献指南

1. 克隆仓库
2. 创建功能分支
3. 提交更改
4. 推送分支
5. 创建Pull Request

## 扩展Monorepo

要添加新包：

1. 在`packages/`目录下创建新包目录
2. 添加`package.json`文件，名称使用`@enterprise-app/`前缀
3. 在根目录的`pnpm-workspace.yaml`中确保包含该路径

要添加新应用：

1. 在`apps/`目录下创建新应用目录
2. 配置应用的`package.json`和构建设置
3. 在根目录的脚本中添加适当的命令
