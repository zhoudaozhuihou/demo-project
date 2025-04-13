/**
 * 存储工具函数
 */

/**
 * 本地存储前缀
 * 用于区分不同项目的本地存储
 */
const PREFIX = 'enterprise_app_';

/**
 * 本地存储服务
 */
export const localStorage = {
  /**
   * 设置本地存储
   * @param {string} key - 键名
   * @param {*} value - 值，会被自动JSON.stringify
   */
  set: (key, value) => {
    try {
      window.localStorage.setItem(
        `${PREFIX}${key}`,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  },

  /**
   * 获取本地存储
   * @param {string} key - 键名
   * @param {*} defaultValue - 默认值，当获取失败时返回
   * @returns {*} 存储的值或默认值
   */
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(`${PREFIX}${key}`);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue;
    }
  },

  /**
   * 移除本地存储
   * @param {string} key - 键名
   */
  remove: (key) => {
    try {
      window.localStorage.removeItem(`${PREFIX}${key}`);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  },

  /**
   * 清除本地存储
   * 只清除以PREFIX开头的存储
   */
  clear: () => {
    try {
      Object.keys(window.localStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => window.localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage items:', error);
    }
  }
};

/**
 * 会话存储服务
 */
export const sessionStorage = {
  /**
   * 设置会话存储
   * @param {string} key - 键名
   * @param {*} value - 值，会被自动JSON.stringify
   */
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(
        `${PREFIX}${key}`,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error('Error setting sessionStorage item:', error);
    }
  },

  /**
   * 获取会话存储
   * @param {string} key - 键名
   * @param {*} defaultValue - 默认值，当获取失败时返回
   * @returns {*} 存储的值或默认值
   */
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(`${PREFIX}${key}`);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Error getting sessionStorage item:', error);
      return defaultValue;
    }
  },

  /**
   * 移除会话存储
   * @param {string} key - 键名
   */
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(`${PREFIX}${key}`);
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
    }
  },

  /**
   * 清除会话存储
   * 只清除以PREFIX开头的存储
   */
  clear: () => {
    try {
      Object.keys(window.sessionStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => window.sessionStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing sessionStorage items:', error);
    }
  }
}; 