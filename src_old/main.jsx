import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import './config/i18n' // 导入国际化配置

// 初始化Mock服务
async function initApp() {
  // 仅在开发环境启用Mock
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    const { initMocks } = await import('./mocks');
    await initMocks();
  }
  
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

initApp();
