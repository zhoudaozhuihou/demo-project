import API from './api';
import { jwtDecode } from 'jwt-decode';

class AuthService {
  /**
   * Authenticate user with credentials
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise with user data
   */
  async login(email, password) {
    try {
      // 开发模式：跳过API验证，允许任何用户名和密码
      // 创建一个模拟的认证令牌和用户数据
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ4MTYyMzkwMjIsInVzZXIiOnsiaWQiOiIxIiwiZmlyc3ROYW1lIjoiQWRtaW4iLCJsYXN0TmFtZSI6IlVzZXIiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl19fQ.3jBlPyUlf_UT0eHFJBaFRnfMl0-8gMvW9GlGWxsH0mg';
      const fakeUser = {
        id: '1',
        firstName: email.split('@')[0] || 'User',
        lastName: 'Account',
        email: email || 'user@example.com',
        roles: ['admin', 'user'],
      };
      
      // 存储假令牌
      this.setTokens(fakeToken, 'fake-refresh-token');
      
      // 返回用户信息
      return fakeUser;
      
      // 注释掉原来的API调用代码
      /*
      const response = await API.post('/auth/login', { email, password });
      const { token, refreshToken, user } = response.data;
      
      this.setTokens(token, refreshToken);
      return user;
      */
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Promise with user data
   */
  async register(userData) {
    try {
      // 开发模式：跳过API验证，直接返回成功
      return {
        success: true,
        message: '注册成功',
        user: {
          id: '2',
          ...userData,
          roles: ['user']
        }
      };
      
      // 注释掉原来的API调用代码
      /*
      const response = await API.post('/auth/register', userData);
      return response.data;
      */
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout current user
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  /**
   * Store authentication tokens
   * @param {string} token - JWT token
   * @param {string} refreshToken - Refresh token
   */
  setTokens(token, refreshToken) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  /**
   * Get user from token
   * @returns {Object|null} - User object or null
   */
  getCurrentUser() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return null;
      
      // 解析令牌
      const decoded = jwtDecode(token);
      
      // 检查令牌是否过期（除非是我们的假令牌）
      if (decoded.exp * 1000 < Date.now() && !token.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ4MTYyMzkwMjI')) {
        this.logout();
        return null;
      }
      
      return decoded.user;
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
      return null;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  /**
   * Check if user has required role
   * @param {string|string[]} requiredRoles - Required role(s)
   * @returns {boolean} - True if authorized
   */
  hasRole(requiredRoles) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Convert to array if single role
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    
    return roles.some(role => user.roles.includes(role));
  }
}

export default new AuthService(); 