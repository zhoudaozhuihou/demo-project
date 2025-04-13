import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

/**
 * 仪表盘页面组件
 */
const DashboardPage = () => {
  const { t } = useTranslation();

  // 模拟数据
  const stats = [
    {
      title: t('dashboard.stats.totalUsers'),
      value: '1,234',
      icon: <PeopleIcon />,
      color: '#1976d2',
    },
    {
      title: t('dashboard.stats.totalOrders'),
      value: '567',
      icon: <ShoppingCartIcon />,
      color: '#2e7d32',
    },
    {
      title: t('dashboard.stats.totalRevenue'),
      value: '$89,234',
      icon: <AttachMoneyIcon />,
      color: '#ed6c02',
    },
    {
      title: t('dashboard.stats.growthRate'),
      value: '+12.5%',
      icon: <TrendingUpIcon />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: stat.color,
                    color: 'white',
                    borderRadius: '50%',
                    p: 1,
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h6" component="div">
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPage; 