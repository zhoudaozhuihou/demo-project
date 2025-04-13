import { useState, useEffect } from 'react';

/**
 * 本地存储Hook
 * 在React状态和localStorage之间同步数据
 * 
 * @param {string} key - 存储键名
 * @param {any} initialValue - 初始值
 */
const useLocalStorage = (key, initialValue) => {
  // 懒初始化函数，从localStorage获取初始值或使用默认值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 获取localStorage中存储的项
      const item = window.localStorage.getItem(key);
      
      // 解析存储的JSON或返回initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  // 当键值对变更时，更新localStorage
  useEffect(() => {
    try {
      // 将状态存储到localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  
  // 设置新值的函数
  const setValue = (value) => {
    try {
      // 允许value是一个函数，类似于React的setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 保存到state
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error);
    }
  };
  
  // 从localStorage中移除项
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };
  
  return [storedValue, setValue, removeItem];
};

export default useLocalStorage; 