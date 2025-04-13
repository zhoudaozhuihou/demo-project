import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 设置MSW服务
export const worker = setupWorker(...handlers); 