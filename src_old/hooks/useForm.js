import { useState, useCallback } from 'react';

/**
 * 表单处理Hook
 * 处理表单状态、验证和提交
 * 
 * @param {Object} initialValues - 表单初始值
 * @param {function} validateFn - 验证函数，返回错误对象
 * @param {function} onSubmit - 提交回调函数
 */
const useForm = (initialValues = {}, validateFn = () => ({}), onSubmit = () => {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 处理输入变化
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    // 如果字段已经被触碰，则重新验证
    if (touched[name]) {
      const validationErrors = validateFn({
        ...values,
        [name]: fieldValue
      });
      setErrors(validationErrors);
    }
  }, [values, touched, validateFn]);
  
  // 处理自定义值（非事件）的变更
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const validationErrors = validateFn({
        ...values,
        [name]: value
      });
      setErrors(validationErrors);
    }
  }, [values, touched, validateFn]);
  
  // 处理失去焦点
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
  }, [values, validateFn]);
  
  // 重置表单
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // 处理表单提交
  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    // 标记所有字段为已触碰
    const touchedFields = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(touchedFields);
    
    // 验证表单
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
    
    // 如果没有错误，则提交
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateFn, onSubmit]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    setValue,
    handleBlur,
    handleSubmit,
    resetForm
  };
};

export default useForm; 