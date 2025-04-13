import { lazy } from 'react';
import config from '../config/env';

// 页面组件（懒加载）
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Users = lazy(() => import('../pages/admin/Users'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));
const ModuleDisabled = lazy(() => import('../pages/ModuleDisabled'));

// 路由配置
// 添加isEnabled属性根据模块配置确定路由是否可访问
// requiredRoles用于角色权限控制
const routes = [
  // 主页路由 - 始终启用
  {
    path: '/',
    component: Home,
    exact: true,
    isEnabled: true, 
  },
  
  // 仪表盘模块
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
    isEnabled: config.modules.dashboard,
    moduleName: 'Dashboard',
  },
  
  // 用户管理模块
  {
    path: '/admin/users',
    component: Users,
    exact: true,
    isEnabled: config.modules.users,
    requiredRoles: ['admin'],
    moduleName: 'User Management',
  },
  
  // 数据分析模块
  {
    path: '/analytics',
    component: lazy(() => import('../pages/Dashboard')), // 假设使用仪表盘作为示例
    exact: true,
    isEnabled: config.modules.analytics,
    moduleName: 'Analytics',
  },
  
  // 个人资料 - 始终启用
  {
    path: '/profile',
    component: Profile,
    exact: true,
    isEnabled: true,
  },
  
  // 设置模块
  {
    path: '/settings',
    component: Settings,
    exact: true,
    isEnabled: config.modules.settings,
    moduleName: 'Settings',
  },
  
  // 错误路由 - 始终启用
  {
    path: '/unauthorized',
    component: Unauthorized,
    exact: true,
    isEnabled: true,
  },
  
  // 模块禁用页面 - 始终启用
  {
    path: '/module-disabled',
    component: ModuleDisabled,
    exact: true,
    isEnabled: true,
  },
  
  // 404页面 - 始终启用
  {
    path: '*',
    component: NotFound,
    isEnabled: true,
  },
];

export default routes; 