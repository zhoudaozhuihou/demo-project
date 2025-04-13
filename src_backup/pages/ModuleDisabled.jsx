import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import { BlockOutlined as BlockIcon } from '@mui/icons-material';

/**
 * 模块禁用页面
 * 当用户尝试访问被禁用的模块时显示
 */
const ModuleDisabled = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const moduleName = location.state?.moduleName || '请求的模块';
  
  // 如果没有通过正确路径访问此页面，重定向到首页
  useEffect(() => {
    if (!location.state?.fromDisabledModule) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleGoHome = () => {
    navigate('/', { replace: true });
  };
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          模块已禁用
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          您尝试访问的模块 <strong>{moduleName}</strong> 在当前环境中不可用。
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
          此模块可能在当前环境中被禁用，或您没有足够的权限访问。如有需要，请联系系统管理员。
        </Alert>
        
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleGoBack}>
            返回上一页
          </Button>
          <Button variant="contained" onClick={handleGoHome}>
            返回首页
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ModuleDisabled; 