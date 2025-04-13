/**
 * 请求钩子
 */
import { useState, useEffect, useCallback } from 'react';
import { httpClient } from '../http/client';

/**
 * 请求钩子
 * @param {object} options - 请求配置
 * @param {string} options.url - 请求地址
 * @param {string} options.method - 请求方法，默认为'GET'
 * @param {object} options.params - 请求参数，用于GET请求
 * @param {object} options.data - 请求数据，用于POST, PUT, PATCH请求
 * @param {boolean} options.manual - 是否手动触发请求，默认为false
 * @returns {object} 请求状态和控制函数
 */
export const useRequest = (options) => {
  const { url, method = 'GET', params, data, manual = false } = options || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = useCallback(async (overrideOptions = {}) => {
    setLoading(true);
    setError(null);

    try {
      const mergedOptions = {
        url,
        method,
        params,
        data,
        ...overrideOptions,
      };

      const result = await httpClient(mergedOptions);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, params, data]);

  useEffect(() => {
    if (!manual && url) {
      fetchData();
    }
  }, [manual, url, fetchData]);

  return {
    loading,
    error,
    data: response,
    run: fetchData,
    refresh: () => fetchData(),
  };
}; 