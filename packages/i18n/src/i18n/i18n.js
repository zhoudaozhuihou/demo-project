import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from '../resources';

/**
 * 初始化i18n实例
 */
const initI18n = (options = {}) => {
  // 合并默认配置和自定义配置
  const config = {
    // 默认语言
    fallbackLng: 'en',
    // 调试模式，默认在开发环境开启
    debug: process.env.NODE_ENV === 'development',
    // 语言资源
    resources,
    // 检测选项
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      cookieMinutes: 160,
    },
    // 插值配置
    interpolation: {
      escapeValue: false // 不转义HTML内容
    },
    // 命名空间
    ns: ['translation'],
    defaultNS: 'translation',
    ...options
  };

  // 初始化i18n实例
  i18n
    // 检测用户语言
    .use(LanguageDetector)
    // 将i18n实例传递给react-i18next
    .use(initReactI18next)
    // 初始化i18next
    .init(config);

  return i18n;
};

export default initI18n; 