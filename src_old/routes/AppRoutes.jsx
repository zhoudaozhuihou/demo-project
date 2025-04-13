import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import ModuleRoute from '../components/ModuleRoute';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import routeConfig from './routeConfig';
import config from '../config/env';

// Layouts
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));

// Auth pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));

// App pages
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Users = lazy(() => import('../pages/admin/Users'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));

// 其他页面通过配置动态加载
const ModuleDisabled = lazy(() => import('../pages/ModuleDisabled'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

/**
 * AppRoutes component for handling application routing
 */
const AppRoutes = () => {
  // 获取应用路由
  const appRoutes = routeConfig.filter(route => 
    route.path !== '/login' && 
    route.path !== '/register' && 
    route.path !== '/forgot-password'
  );
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Auth Routes - 不需要模块控制 */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* 模块禁用页面 - 独立路由 */}
        <Route path="module-disabled" element={<ModuleDisabled />} />
        
        {/* 直接渲染首页 - 无需身份验证 */}
        <Route path="/" element={<Home />} />

        {/* App Routes - 受模块控制的路由 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* 渲染所有应用路由 */}
          {appRoutes.map(route => {
            // 跳过首页路由，因为我们已经在上面直接渲染了
            if (route.path === '/') return null;
            
            const RouteComponent = route.component;
            
            return (
              <Route
                key={route.path}
                path={route.path === '/' ? '' : route.path.replace(/^\//, '')}
                element={
                  <ModuleRoute 
                    isEnabled={route.isEnabled} 
                    moduleName={route.moduleName || route.path}
                  >
                    {route.requiredRoles ? (
                      <ProtectedRoute requiredRoles={route.requiredRoles}>
                        <RouteComponent />
                      </ProtectedRoute>
                    ) : (
                      <RouteComponent />
                    )}
                  </ModuleRoute>
                }
              />
            );
          })}
        </Route>

        {/* Error Routes */}
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 