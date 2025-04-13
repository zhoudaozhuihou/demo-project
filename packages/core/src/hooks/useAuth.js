/**
 * 身份验证钩子
 */
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useStorage';
import { httpClient } from '../http/client';

/**
 * 身份验证钩子
 * 用于处理用户登录、登出和身份验证状态
 */
export const useAuth = () => {
  const [token, setToken, removeToken] = useLocalStorage('token');
  const [user, setUser, removeUser] = useLocalStorage('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // 初始化 - 检查token有效性
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [token]);

  // 登录方法
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      // 在实际应用中，这里应该调用API
      // 这里仅作示例，模拟登录API调用
      
      // 模拟成功响应
      const response = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'Test User',
          email: credentials.email,
          roles: ['user']
        }
      };

      // 保存token和用户信息
      setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);

      return response.user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setToken, setUser]);

  // 登出方法
  const logout = useCallback(() => {
    // 清除所有存储的认证信息
    removeToken();
    removeUser();
    setIsAuthenticated(false);
  }, [removeToken, removeUser]);

  // 获取当前用户信息
  const getCurrentUser = useCallback(async () => {
    if (!token) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      // 在实际应用中，这里应该调用API获取最新的用户信息
      // 这里仅返回存储的用户信息
      return user;
    } catch (err) {
      setError(err.message || 'Failed to get user information');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  // 刷新token
  const refreshToken = useCallback(async () => {
    if (!token) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      // 在实际应用中，这里应该调用API刷新token
      // 这里仅模拟刷新成功
      const response = {
        token: 'new-mock-jwt-token'
      };
      
      // 保存新token
      setToken(response.token);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to refresh token');
      // 如果刷新失败，则登出
      logout();
      return false;
    } finally {
      setLoading(false);
    }
  }, [token, setToken, logout]);

  return {
    token,
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    getCurrentUser,
    refreshToken
  };
}; 