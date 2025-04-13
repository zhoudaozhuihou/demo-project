import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * 首页组件
 */
const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('home.welcome')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('home.description')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            component={Link}
            to="/dashboard"
            sx={{
              p: 3,
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {t('home.dashboardCard.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('home.dashboardCard.description')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage; 