import api from './api';

/**
 * 产品服务
 * 未来可以轻松替换为真实API调用
 */
export const productService = {
  /**
   * 获取所有产品
   */
  getAllProducts: async () => {
    try {
      return await api.get('/products');
    } catch (error) {
      console.error('获取产品列表失败:', error);
      throw error;
    }
  },

  /**
   * 获取单个产品
   * @param {number} id - 产品ID
   */
  getProductById: async (id) => {
    try {
      return await api.get(`/products/${id}`);
    } catch (error) {
      console.error(`获取产品详情失败(ID: ${id}):`, error);
      throw error;
    }
  },

  /**
   * 按类别获取产品
   * @param {string} category - 产品类别
   */
  getProductsByCategory: async (category) => {
    try {
      const products = await api.get('/products');
      return products.filter(product => product.category === category);
    } catch (error) {
      console.error(`获取产品分类失败(类别: ${category}):`, error);
      throw error;
    }
  }
}; 