import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 将mock服务器初始化移至条件加载中
async function initApp() {
  // 仅在开发环境启用Mock
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
      });
      console.log('Mock service worker started');
    } catch (error) {
      console.warn('Mock service worker could not be started', error);
    }
  }

  // 渲染应用
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

initApp(); 