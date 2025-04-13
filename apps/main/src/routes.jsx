import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BASE_ROUTES } from '@enterprise-app/core';

// 导入布局
import MainLayout from './layouts/MainLayout';

// 导入页面
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';

// 导入权限控制组件
import AuthGuard from './components/AuthGuard';

/**
 * 应用路由配置
 */
const AppRoutes = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      {/* 公共路由 - 不需要登录 */}
      <Route path={BASE_ROUTES.LOGIN} element={<LoginPage />} />
      
      {/* 需要验证的路由 - 使用主布局和权限控制 */}
      <Route 
        path={BASE_ROUTES.HOME} 
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        <Route index element={<HomePage />} />
        <Route path={BASE_ROUTES.DASHBOARD.replace('/', '')} element={<DashboardPage />} />
        <Route path={BASE_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 