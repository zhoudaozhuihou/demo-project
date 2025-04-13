import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 节流Hook
 * 限制值更新的频率，常用于滚动事件等高频触发场景
 * 
 * @param {any} value - 需要节流的值
 * @param {number} limit - 节流时间间隔（毫秒）
 * @returns {any} - 节流后的值
 */
export const useThrottle = (value, limit = 200) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());
  
  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      if (now - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = now;
      }
    }, limit - (Date.now() - lastRan.current));
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);
  
  return throttledValue;
};

/**
 * 节流函数Hook
 * 创建一个节流函数
 * 
 * @param {Function} fn - 要节流的函数
 * @param {number} limit - 节流时间间隔（毫秒）
 * @returns {Function} - 节流后的函数
 */
export const useThrottleCallback = (fn, limit = 200) => {
  const lastRan = useRef(Date.now());
  const lastArgs = useRef([]);
  const timeoutRef = useRef(null);
  
  // 在组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const throttledFn = useCallback((...args) => {
    lastArgs.current = args;
    
    const now = Date.now();
    if (now - lastRan.current >= limit) {
      // 如果已经超过节流时间，立即执行
      fn(...args);
      lastRan.current = now;
    } else {
      // 否则，设置一个定时器以在剩余时间后执行
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        lastRan.current = Date.now();
        fn(...lastArgs.current);
        timeoutRef.current = null;
      }, limit - (now - lastRan.current));
    }
  }, [fn, limit]);
  
  return throttledFn;
};

export default useThrottle; 