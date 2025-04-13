import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import appConfig from '../appConfig';

// 导入核心翻译
import enCore from './locales/en/core';
import zhCore from './locales/zh/core';
import esCore from './locales/es/core';

// 导入模块翻译
import enHome from './locales/en/home';
import zhHome from './locales/zh/home';
import esHome from './locales/es/home';

import enDashboard from './locales/en/dashboard';
import zhDashboard from './locales/zh/dashboard';
import esDashboard from './locales/es/dashboard';

import enAuth from './locales/en/auth';
import zhAuth from './locales/zh/auth';
import esAuth from './locales/es/auth';

import enSettings from './locales/en/settings';
import zhSettings from './locales/zh/settings';
import esSettings from './locales/es/settings';

import enUsers from './locales/en/users';
import zhUsers from './locales/zh/users';
import esUsers from './locales/es/users';

// 初始化i18n实例
i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    // 默认语言
    fallbackLng: appConfig.i18n.defaultLanguage,
    // 调试模式
    debug: import.meta.env.DEV,
    // 语言资源
    resources: {
      en: {
        core: enCore,
        home: enHome,
        dashboard: enDashboard,
        auth: enAuth,
        settings: enSettings,
        users: enUsers
      },
      zh: {
        core: zhCore,
        home: zhHome,
        dashboard: zhDashboard,
        auth: zhAuth,
        settings: zhSettings,
        users: zhUsers
      },
      es: {
        core: esCore,
        home: esHome,
        dashboard: esDashboard,
        auth: esAuth,
        settings: esSettings,
        users: esUsers
      }
    },
    // 默认命名空间
    defaultNS: 'core',
    // 命名空间
    ns: ['core', 'home', 'dashboard', 'auth', 'settings', 'users'],
    // 检测选项
    detection: {
      order: appConfig.i18n.detection.order,
      lookupLocalStorage: 'i18nextLng',
      caches: appConfig.i18n.detection.caches,
      cookieMinutes: 160,
    },
    // 插值配置
    interpolation: {
      escapeValue: false // 不转义HTML内容
    }
  });

export default i18n; 