import api from './api';

/**
 * 用户服务
 * 未来可以轻松替换为真实API调用
 */
export const userService = {
  /**
   * 用户登录
   * @param {string} email - 用户邮箱
   * @param {string} password - 用户密码
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // 存储token到本地存储
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      
      return response.user;
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  },

  /**
   * 退出登录
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  /**
   * 获取所有用户
   */
  getAllUsers: async () => {
    try {
      return await api.get('/users');
    } catch (error) {
      console.error('获取用户列表失败:', error);
      throw error;
    }
  }
}; 