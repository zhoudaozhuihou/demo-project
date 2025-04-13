import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * 模块路由守卫组件
 * 检查模块是否启用，如果禁用则重定向到模块禁用页面
 */
export const ModuleRoute = ({ children, isEnabled, moduleName }) => {
  const location = useLocation();
  
  // 如果模块启用，正常渲染子组件
  if (isEnabled) {
    return children;
  }
  
  // 如果模块禁用，重定向到模块禁用页面
  return (
    <Navigate 
      to="/module-disabled" 
      state={{ 
        fromDisabledModule: true, 
        moduleName, 
        from: location 
      }} 
      replace 
    />
  );
};

ModuleRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  moduleName: PropTypes.string.isRequired,
};

export default ModuleRoute; 