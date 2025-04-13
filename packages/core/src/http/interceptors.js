/**
 * HTTP拦截器
 */
import { localStorage } from '../utils/storage';

/**
 * 设置HTTP拦截器
 * @param {object} httpClient - axios实例
 */
export const setupInterceptors = (httpClient) => {
  // 请求拦截器
  httpClient.interceptors.request.use(
    (config) => {
      // 从本地存储获取token
      const token = localStorage.get('token');
      // 如果存在token则添加到请求头中
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  httpClient.interceptors.response.use(
    (response) => {
      // 直接返回响应数据
      return response.data;
    },
    (error) => {
      const { response } = error;

      // 统一处理HTTP错误
      if (response) {
        // 根据HTTP状态码处理不同的错误
        switch (response.status) {
          case 401: // 未授权
            // 清除过期的token
            localStorage.remove('token');
            // 跳转到登录页面
            window.location.href = '/login';
            break;
          case 403: // 禁止访问
            console.error('您没有权限访问此资源');
            break;
          case 404: // 资源不存在
            console.error('请求的资源不存在');
            break;
          case 500: // 服务器错误
            console.error('服务器发生错误，请稍后再试');
            break;
          default:
            console.error(`HTTP错误: ${response.status}`);
            break;
        }
      } else if (error.request) {
        // 请求已发送但未收到响应
        console.error('网络错误，服务器未响应');
      } else {
        // 请求配置错误
        console.error('请求配置错误', error.message);
      }

      return Promise.reject(error);
    }
  );
}; 