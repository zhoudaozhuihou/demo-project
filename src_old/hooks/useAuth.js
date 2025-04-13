import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  login, 
  logout, 
  register, 
  selectIsAuthenticated, 
  selectCurrentUser,
  selectAuthLoading,
  selectAuthError,
  clearError
} from '../redux/slices/authSlice';

/**
 * 认证相关的Hook
 * 提供登录、注册、注销等功能
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  
  /**
   * 用户登录
   * @param {Object} credentials - 用户登录凭据
   * @param {string} credentials.email - 邮箱
   * @param {string} credentials.password - 密码
   * @param {boolean} credentials.rememberMe - 是否记住登录状态
   * @param {string} redirectTo - 登录成功后重定向的路径
   */
  const handleLogin = async (credentials, redirectTo = '/dashboard') => {
    try {
      await dispatch(login(credentials)).unwrap();
      
      // 获取来源路径或使用默认值
      const from = location.state?.from?.pathname || redirectTo;
      navigate(from, { replace: true });
      return true;
    } catch (error) {
      return false;
    }
  };
  
  /**
   * 用户注册
   * @param {Object} userData - 用户注册数据
   */
  const handleRegister = async (userData) => {
    try {
      await dispatch(register(userData)).unwrap();
      navigate('/login', { 
        state: { 
          message: '注册成功！请使用您的新账号登录。' 
        } 
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  
  /**
   * 用户注销
   * @param {string} redirectTo - 注销后重定向的路径
   */
  const handleLogout = (redirectTo = '/login') => {
    dispatch(logout());
    navigate(redirectTo);
  };
  
  /**
   * 清除认证错误
   */
  const handleClearError = () => {
    dispatch(clearError());
  };
  
  return {
    isAuthenticated,
    user,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError: handleClearError,
  };
};

export default useAuth; 