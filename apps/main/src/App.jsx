import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { LanguageSwitcher } from '@enterprise-app/ui';
import theme from './theme';
import i18n from '@enterprise-app/i18n';
import Routes from './routes';

/**
 * 主应用组件
 */
const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Enterprise App
                </Typography>
                <LanguageSwitcher />
              </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes />
            </Container>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App; 