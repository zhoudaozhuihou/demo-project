/**
 * 本地存储钩子
 */
import { useState, useCallback, useEffect } from 'react';
import { localStorage, sessionStorage } from '../utils/storage';

/**
 * 本地存储钩子
 * @param {string} key - 本地存储键名
 * @param {*} initialValue - 初始值
 * @param {object} options - 配置选项
 * @param {boolean} options.session - 是否使用sessionStorage，默认为false
 * @returns {array} [存储值, 设置值函数, 移除值函数]
 */
export const useStorage = (key, initialValue = null, options = {}) => {
  const { session = false } = options;
  const storage = session ? sessionStorage : localStorage;

  // 初始化状态
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 尝试从存储中获取值
      return storage.get(key, initialValue);
    } catch (error) {
      console.error(`Error retrieving ${key} from storage:`, error);
      return initialValue;
    }
  });

  // 监听其他窗口的存储变化（只对localStorage有效）
  useEffect(() => {
    if (session) return; // sessionStorage不支持跨窗口通信

    const handleStorageChange = (e) => {
      if (e.key === `enterprise_app_${key}`) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (error) {
          console.error(`Error parsing ${key} from storage event:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, session]);

  // 设置值
  const setValue = useCallback(
    (value) => {
      try {
        // 支持函数式更新
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // 保存到状态
        setStoredValue(valueToStore);

        // 保存到存储
        storage.set(key, valueToStore);
      } catch (error) {
        console.error(`Error setting ${key} to storage:`, error);
      }
    },
    [key, storage, storedValue]
  );

  // 移除值
  const removeValue = useCallback(() => {
    try {
      // 从状态中移除
      setStoredValue(null);

      // 从存储中移除
      storage.remove(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
    }
  }, [key, storage]);

  return [storedValue, setValue, removeValue];
};

/**
 * 本地存储钩子（localStorage）
 * @param {string} key - 本地存储键名
 * @param {*} initialValue - 初始值
 * @returns {array} [存储值, 设置值函数, 移除值函数]
 */
export const useLocalStorage = (key, initialValue = null) => {
  return useStorage(key, initialValue, { session: false });
};

/**
 * 会话存储钩子（sessionStorage）
 * @param {string} key - 会话存储键名
 * @param {*} initialValue - 初始值
 * @returns {array} [存储值, 设置值函数, 移除值函数]
 */
export const useSessionStorage = (key, initialValue = null) => {
  return useStorage(key, initialValue, { session: true });
}; 