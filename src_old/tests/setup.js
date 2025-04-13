import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

// 创建MSW服务器
export const server = setupServer(...handlers);

// 测试前启动服务器
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// 每次测试后重置处理程序
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// 测试结束后关闭服务器
afterAll(() => server.close()); 