import { useState, useEffect, useCallback } from 'react';

/**
 * 防抖Hook
 * 延迟处理快速变化的值，常用于搜索输入等场景
 * 
 * @param {any} value - 需要防抖的值
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {any} - 防抖后的值
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    // 设置定时器在指定延迟后更新debouncedValue
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // 在下一次effect运行前清除定时器
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

/**
 * 防抖函数Hook
 * 创建一个防抖函数
 * 
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
export const useDebounceCallback = (fn, delay = 500) => {
  const [timer, setTimer] = useState(null);
  
  const debouncedFn = useCallback((...args) => {
    // 清除之前的定时器
    if (timer) clearTimeout(timer);
    
    // 设置新的定时器
    const newTimer = setTimeout(() => {
      fn(...args);
    }, delay);
    
    setTimer(newTimer);
  }, [fn, delay, timer]);
  
  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);
  
  return debouncedFn;
};

export default useDebounce; 