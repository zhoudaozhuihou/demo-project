/**
 * 应用全局配置
 * 统一管理应用配置，支持国际化和主题等全局设置
 */

// 导入环境配置
import envConfig from './env';

/**
 * 默认配置
 */
const defaultConfig = {
  // 应用基本信息
  app: {
    ...envConfig.app
  },

  // API配置
  api: {
    ...envConfig.api
  },

  // 主题配置
  theme: {
    // 默认主题模式 - light, dark, system
    defaultMode: 'light',
    // 可用主题
    themes: ['light', 'dark']
  },

  // 国际化配置
  i18n: {
    // 默认语言
    defaultLanguage: 'en',
    // 可用语言
    languages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'zh', name: '中文', flag: '🇨🇳' },
      { code: 'es', name: 'Español', flag: '🇪🇸' }
    ],
    // 语言检测顺序
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  },

  // 认证配置
  auth: {
    // 是否启用记住我功能
    rememberMe: true,
    // token存储键名
    tokenStorageKey: 'auth-token',
    // refresh token存储键名
    refreshTokenStorageKey: 'refresh-token',
    // 登录成功后重定向路径
    loginRedirectUrl: '/',
    // 登出后重定向路径
    logoutRedirectUrl: '/login'
  },

  // 布局配置
  layout: {
    // 侧边栏配置
    sidebar: {
      // 默认状态
      defaultOpen: true,
      // 是否固定
      fixed: true,
      // 宽度(像素)
      width: 240
    },
    // 顶部导航栏配置
    topbar: {
      // 是否固定
      fixed: true,
      // 高度(像素)
      height: 64
    }
  },

  // 模块配置
  modules: {
    ...envConfig.modules
  },

  // 功能特性开关
  features: {
    ...envConfig.features
  }
};

/**
 * 根据环境加载对应配置
 */
const loadEnvConfig = () => {
  try {
    // 检查当前环境 
    const env = import.meta.env.MODE || 'development';
    
    // 如果有环境特定的配置，可以在这里加载
    // 例如: import(`./env.${env}.js`).default;
    
    // 合并环境配置和默认配置
    return {
      ...defaultConfig,
      env
    };
  } catch (error) {
    console.error('Failed to load environment config:', error);
    return defaultConfig;
  }
};

// 导出配置
const appConfig = loadEnvConfig();

export default appConfig; 