import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@enterprise-app/core';
import { BASE_ROUTES } from '@enterprise-app/core';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * 权限控制组件
 * 用于保护需要登录才能访问的路由
 */
const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 如果正在加载用户信息，显示加载中
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // 如果未登录，重定向到登录页面
  if (!isAuthenticated) {
    // 保存当前路径，登录后可以重定向回来
    return <Navigate to={BASE_ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // 已登录，渲染子组件
  return children;
};

export default AuthGuard; 