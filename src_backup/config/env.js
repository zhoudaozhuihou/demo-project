/**
 * 环境配置
 * 从.env文件中读取配置参数
 */

// 获取当前环境
const ENV = import.meta.env.VITE_APP_ENV || 'development';

// 应用基本信息
const APP = {
  name: import.meta.env.VITE_APP_NAME || 'Enterprise App',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  env: ENV,
  debug: import.meta.env.VITE_APP_DEBUG === 'true',
};

// API配置
const API = {
  url: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
};

// 功能特性开关
const FEATURES = {
  newUserInterface: import.meta.env.VITE_APP_FEATURE_NEW_UI === 'true',
  betaFeatures: import.meta.env.VITE_APP_FEATURE_BETA === 'true',
  analytics: import.meta.env.VITE_APP_FEATURE_ANALYTICS === 'true',
};

// 模块启用配置
const MODULES = {
  dashboard: import.meta.env.VITE_MODULE_DASHBOARD === 'true',
  users: import.meta.env.VITE_MODULE_USERS === 'true',
  analytics: import.meta.env.VITE_MODULE_ANALYTICS === 'true',
  settings: import.meta.env.VITE_MODULE_SETTINGS === 'true',
};

// 环境特定配置
const envConfig = {
  // 开发环境
  development: {
    isDev: true,
    isTest: false,
    isProd: false,
  },
  // SIT环境
  sit: {
    isDev: false,
    isTest: true,
    isProd: false,
  },
  // UAT环境
  uat: {
    isDev: false,
    isTest: true,
    isProd: false,
  },
  // 预生产环境
  ppd: {
    isDev: false,
    isTest: false,
    isProd: true,
  },
  // 生产环境
  production: {
    isDev: false,
    isTest: false,
    isProd: true,
  },
};

// 导出配置对象
const config = {
  app: APP,
  api: API,
  features: FEATURES,
  modules: MODULES,
  ...envConfig[ENV],
};

export default config; 