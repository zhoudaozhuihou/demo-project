import api from './api';

/**
 * 仪表盘服务
 * 未来可以轻松替换为真实API调用
 */
export const dashboardService = {
  /**
   * 获取仪表盘数据
   */
  getDashboardData: async () => {
    try {
      return await api.get('/dashboard');
    } catch (error) {
      console.error('获取仪表盘数据失败:', error);
      throw error;
    }
  }
}; 