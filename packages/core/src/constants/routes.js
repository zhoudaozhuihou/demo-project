/**
 * 路由常量
 */

/**
 * 基础路由路径
 */
export const BASE_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '*',
};

/**
 * 用户相关路由路径
 */
export const USER_ROUTES = {
  LIST: '/users',
  DETAIL: '/users/:id',
  CREATE: '/users/create',
  EDIT: '/users/:id/edit',
};

/**
 * 产品相关路由路径
 */
export const PRODUCT_ROUTES = {
  LIST: '/products',
  DETAIL: '/products/:id',
  CREATE: '/products/create',
  EDIT: '/products/:id/edit',
};

/**
 * 订单相关路由路径
 */
export const ORDER_ROUTES = {
  LIST: '/orders',
  DETAIL: '/orders/:id',
  CREATE: '/orders/create',
  EDIT: '/orders/:id/edit',
};

/**
 * 报表相关路由路径
 */
export const REPORT_ROUTES = {
  DASHBOARD: '/reports/dashboard',
  SALES: '/reports/sales',
  CUSTOMERS: '/reports/customers',
  PRODUCTS: '/reports/products',
}; 