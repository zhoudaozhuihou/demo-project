import React from 'react';
import { Box, Paper, Typography, Chip, Grid } from '@mui/material';
import config from '../config/env';

/**
 * 环境信息组件
 * 显示当前环境的配置信息
 */
const EnvInfo = () => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        环境信息
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              应用信息
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">
                名称: {config.app.name}
              </Typography>
              <Typography variant="body2">
                版本: {config.app.version}
              </Typography>
              <Typography variant="body2">
                环境: <Chip 
                  label={config.app.env} 
                  color={config.isProd ? 'error' : config.isTest ? 'warning' : 'success'} 
                  size="small"
                />
              </Typography>
              <Typography variant="body2">
                调试模式: {config.app.debug ? '开启' : '关闭'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              API配置
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">
                API地址: {config.api.url}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              功能特性
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label="新UI界面" 
                color={config.features.newUserInterface ? 'primary' : 'default'}
                variant={config.features.newUserInterface ? 'filled' : 'outlined'}
              />
              <Chip 
                label="Beta功能" 
                color={config.features.betaFeatures ? 'primary' : 'default'}
                variant={config.features.betaFeatures ? 'filled' : 'outlined'}
              />
              <Chip 
                label="数据分析" 
                color={config.features.analytics ? 'primary' : 'default'}
                variant={config.features.analytics ? 'filled' : 'outlined'}
              />
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              环境类型
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
              <Chip 
                label="开发环境" 
                color={config.isDev ? 'success' : 'default'}
                variant={config.isDev ? 'filled' : 'outlined'}
              />
              <Chip 
                label="测试环境" 
                color={config.isTest ? 'warning' : 'default'}
                variant={config.isTest ? 'filled' : 'outlined'}
              />
              <Chip 
                label="生产环境" 
                color={config.isProd ? 'error' : 'default'}
                variant={config.isProd ? 'filled' : 'outlined'}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EnvInfo; 