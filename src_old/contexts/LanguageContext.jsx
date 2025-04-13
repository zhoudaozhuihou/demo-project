import { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import appConfig from '../config/appConfig';

// 创建语言上下文
export const LanguageContext = createContext();

/**
 * 语言上下文提供者组件
 * 管理语言状态和切换
 */
export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('i18nextLng') || appConfig.i18n.defaultLanguage
  );

  // 可用语言列表
  const languages = appConfig.i18n.languages;

  /**
   * 切换语言
   * @param {string} langCode - 语言代码
   */
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    localStorage.setItem('i18nextLng', langCode);
  };

  // 初始化语言设置
  useEffect(() => {
    // 确保当前语言可用
    const isValidLang = languages.some(lang => lang.code === currentLang);
    
    if (!isValidLang) {
      // 如果当前语言不可用，回退到默认语言
      changeLanguage(appConfig.i18n.defaultLanguage);
    } else if (currentLang !== i18n.language) {
      // 如果当前语言与i18n使用的语言不同，同步
      changeLanguage(currentLang);
    }
  }, [currentLang]); // eslint-disable-line react-hooks/exhaustive-deps

  // 提供语言上下文值
  const contextValue = {
    currentLang,
    changeLanguage,
    languages
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * 使用语言上下文的自定义hook
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}; 