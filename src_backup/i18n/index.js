import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en';
import zhTranslations from './locales/zh';
import esTranslations from './locales/es';

// 初始化i18n实例
i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 将i18n实例传递给react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    // 默认语言
    fallbackLng: 'en',
    // 调试模式
    debug: import.meta.env.DEV,
    // 语言资源
    resources: {
      en: {
        translation: enTranslations
      },
      zh: {
        translation: zhTranslations
      },
      es: {
        translation: esTranslations
      }
    },
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
    defaultNS: 'translation'
  });

export default i18n; 