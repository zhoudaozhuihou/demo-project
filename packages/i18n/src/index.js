/**
 * @enterprise-app/i18n
 * 
 * 国际化库的主入口文件
 */

// 导出 i18n 实例和配置
export * from './i18n';

// 导出语言资源
export * from './resources';

// 导出翻译钩子和工具
export * from './hooks';

// 导出常量
export * from './constants';

/**
 * i18n包导出文件
 */
import initI18n from './i18n/i18n';

// 初始化i18n实例并导出
const i18n = initI18n();

export default i18n; 