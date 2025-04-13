import { useState, useEffect } from 'react';

/**
 * 媒体查询Hook
 * 监听媒体查询匹配状态
 * 
 * @param {string} query - CSS媒体查询字符串
 * @returns {boolean} - 查询匹配结果
 */
const useMediaQuery = (query) => {
  // 获取查询的初始状态
  const getMatches = (query) => {
    // 检查是否在浏览器环境
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };
  
  const [matches, setMatches] = useState(getMatches(query));
  
  // 处理媒体查询变化
  const handleChange = () => {
    setMatches(getMatches(query));
  };
  
  useEffect(() => {
    const matchMedia = window.matchMedia(query);
    
    // 初始化匹配状态
    handleChange();
    
    // 监听变化
    if (matchMedia.addListener) {
      // 旧版API (Safari)
      matchMedia.addListener(handleChange);
    } else {
      // 新版API
      matchMedia.addEventListener('change', handleChange);
    }
    
    // 移除监听
    return () => {
      if (matchMedia.removeListener) {
        // 旧版API (Safari)
        matchMedia.removeListener(handleChange);
      } else {
        // 新版API
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);
  
  return matches;
};

// 预设常用的断点
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

export default useMediaQuery; 