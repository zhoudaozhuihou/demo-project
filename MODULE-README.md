# 模块启用/禁用系统

本项目实现了基于环境变量的模块动态启用/禁用系统，允许根据不同环境控制功能模块的可用性。

## 功能特点

1. **环境变量控制**：通过`.env`文件设置不同环境的模块启用状态
2. **路由自动控制**：禁用的模块路由会自动重定向到模块禁用页面
3. **界面适配**：导航菜单会根据模块状态自动隐藏或显示对应入口
4. **运行时检测**：可在运行时检查模块状态，实现条件性渲染或功能限制

## 配置方式

在各环境的`.env`文件中添加以下配置：

```
# 模块启用配置
VITE_MODULE_DASHBOARD=true
VITE_MODULE_USERS=true
VITE_MODULE_ANALYTICS=true
VITE_MODULE_SETTINGS=true
```

只需将对应模块的值设为`true`或`false`即可启用或禁用该模块。

## 路由配置

模块的路由配置位于`src/routes/routeConfig.js`，每个路由配置包含以下属性：

```javascript
{
  path: '/dashboard',             // 路由路径
  component: Dashboard,           // 路由组件
  exact: true,                    // 是否精确匹配
  isEnabled: config.modules.dashboard, // 模块是否启用
  moduleName: 'Dashboard',        // 模块名称，用于禁用提示
  requiredRoles: ['admin'],       // 可选，所需角色（权限控制）
}
```

## 代码示例

### 1. 检查模块状态

```javascript
import config from '../config/env';

// 检查模块是否启用
if (config.modules.analytics) {
  // 执行分析模块相关操作
}
```

### 2. 条件性渲染

```jsx
import config from '../config/env';

function FeatureComponent() {
  return (
    <div>
      {config.modules.dashboard && <DashboardComponent />}
      
      {config.modules.analytics ? (
        <AnalyticsComponent />
      ) : (
        <FeatureDisabledMessage module="Analytics" />
      )}
    </div>
  );
}
```

### 3. 自定义ModuleRoute使用

```jsx
import ModuleRoute from '../components/ModuleRoute';
import config from '../config/env';

<Route 
  path="/custom-feature" 
  element={
    <ModuleRoute 
      isEnabled={config.modules.customFeature} 
      moduleName="自定义功能"
    >
      <CustomFeatureComponent />
    </ModuleRoute>
  }
/>
```

## 环境特定配置

您可以为不同环境设置不同的模块配置：

- **开发环境**：通常启用所有模块方便开发
- **SIT环境**：可以禁用某些尚未测试的模块
- **生产环境**：只启用已完成并通过测试的模块

## 注意事项

1. 模块禁用不会影响打包，所有代码仍会包含在构建中
2. 如需从构建中完全排除某模块，需使用构建工具的Tree-shaking功能
3. 模块状态检查在客户端进行，不能用于敏感功能的安全控制 