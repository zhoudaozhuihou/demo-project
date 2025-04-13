import { startWorker } from './browser';

// 判断是否需要启用mock
const ENABLE_MOCKS = import.meta.env.VITE_ENABLE_MOCKS === 'true';

/**
 * 初始化Mock服务
 */
export const initMocks = async () => {
  if (ENABLE_MOCKS) {
    // 仅在需要时加载并启动MSW
    await startWorker();
  }
};

// 导出处理程序供测试使用
export { handlers } from './handlers.jsx'; 