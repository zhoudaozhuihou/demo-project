import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.jsx';

// 这个模块负责在浏览器环境中设置Service Worker
export const worker = setupWorker(...handlers);

// 启动worker
export const startWorker = async () => {
  try {
    if (import.meta.env.DEV) {
      await worker.start({
        onUnhandledRequest: 'bypass', // 不拦截未处理的请求，避免干扰真实API
      });
      console.log('%c[MSW] 已启动Mock服务', 'color: green; font-weight: bold;');
    }
  } catch (error) {
    console.error('MSW worker启动失败:', error);
  }
}; 