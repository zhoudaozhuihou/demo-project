/**
 * 语言资源入口文件
 */

// 英语翻译
import enCommon from './locales/en/common';
import enHome from './locales/en/home';
import enDashboard from './locales/en/dashboard';
import enNotFound from './locales/en/notFound';
import enLogin from './locales/en/login';
import enUsers from './locales/en/users';

// 中文翻译
import zhCommon from './locales/zh/common';
import zhHome from './locales/zh/home';
import zhDashboard from './locales/zh/dashboard';
import zhNotFound from './locales/zh/notFound';
import zhLogin from './locales/zh/login';
import zhUsers from './locales/zh/users';

// 西班牙语翻译
import esCommon from './locales/es/common';
import esHome from './locales/es/home';
import esDashboard from './locales/es/dashboard';
import esNotFound from './locales/es/notFound';
import esLogin from './locales/es/login';
import esUsers from './locales/es/users';

// 合并所有翻译
const resources = {
  en: {
    translation: {
      common: enCommon,
      home: enHome,
      dashboard: enDashboard,
      notFound: enNotFound,
      login: enLogin,
      users: enUsers
    }
  },
  zh: {
    translation: {
      common: zhCommon,
      home: zhHome,
      dashboard: zhDashboard,
      notFound: zhNotFound,
      login: zhLogin,
      users: zhUsers
    }
  },
  es: {
    translation: {
      common: esCommon,
      home: esHome,
      dashboard: esDashboard,
      notFound: esNotFound,
      login: esLogin,
      users: esUsers
    }
  }
};

export { resources };
export default resources; 