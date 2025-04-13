/**
 * HTTP客户端
 */
import axios from 'axios';
import { setupInterceptors } from './interceptors';

/**
 * 创建axios实例
 */
export const createHttpClient = (options = {}) => {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  // 合并默认配置和自定义配置
  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers || {}),
    },
  };

  // 创建axios实例
  const httpClient = axios.create(config);

  // 设置拦截器
  setupInterceptors(httpClient);

  return httpClient;
};

// 导出默认的HTTP客户端实例
export const httpClient = createHttpClient();

/**
 * GET请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} options - 请求配置
 * @returns {Promise} axios响应
 */
export const get = (url, params = {}, options = {}) => {
  return httpClient.get(url, { params, ...options });
};

/**
 * POST请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} options - 请求配置
 * @returns {Promise} axios响应
 */
export const post = (url, data = {}, options = {}) => {
  return httpClient.post(url, data, options);
};

/**
 * PUT请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} options - 请求配置
 * @returns {Promise} axios响应
 */
export const put = (url, data = {}, options = {}) => {
  return httpClient.put(url, data, options);
};

/**
 * DELETE请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} options - 请求配置
 * @returns {Promise} axios响应
 */
export const del = (url, params = {}, options = {}) => {
  return httpClient.delete(url, { params, ...options });
};

/**
 * PATCH请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} options - 请求配置
 * @returns {Promise} axios响应
 */
export const patch = (url, data = {}, options = {}) => {
  return httpClient.patch(url, data, options);
}; 