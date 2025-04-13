/**
 * 验证工具函数
 */

/**
 * 验证电子邮件格式
 * @param {string} email - 电子邮件地址
 * @returns {boolean} 是否是有效的电子邮件地址
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  // 基本的电子邮件验证正则表达式
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * 验证手机号码格式（中国大陆）
 * @param {string} phone - 手机号码
 * @returns {boolean} 是否是有效的手机号码
 */
export const isValidPhoneNumber = (phone) => {
  if (!phone) return false;
  // 中国大陆手机号码验证正则表达式
  const regex = /^1[3-9]\d{9}$/;
  return regex.test(phone);
};

/**
 * 验证密码强度
 * 强密码：至少8位，包含大小写字母、数字和特殊字符
 * @param {string} password - 密码
 * @returns {boolean} 是否是强密码
 */
export const isStrongPassword = (password) => {
  if (!password) return false;
  // 强密码验证正则表达式：至少8位，包含大小写字母、数字和特殊字符
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(password);
};

/**
 * 验证URL格式
 * @param {string} url - URL地址
 * @returns {boolean} 是否是有效的URL
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 验证身份证号码（中国大陆）
 * @param {string} idCard - 身份证号码
 * @returns {boolean} 是否是有效的身份证号码
 */
export const isValidIdCard = (idCard) => {
  if (!idCard) return false;
  // 简化的身份证号码验证：15位或18位，最后一位可能是X
  const regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regex.test(idCard);
};

/**
 * 验证是否为空
 * @param {*} value - 需要验证的值
 * @returns {boolean} 是否为空
 */
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}; 