import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import store from './redux/store';
import theme from './styles/theme';
import { initializeAuth } from './redux/slices/authSlice';
import { selectDarkMode } from './redux/slices/uiSlice';
import { createTheme } from '@mui/material/styles';
import { LanguageProvider } from './contexts/LanguageContext';

// Application wrapper with providers
const AppWrapper = () => {
  return (
    <ReduxProvider store={store}>
      <LanguageProvider>
        <Router>
          <ThemedApp />
        </Router>
      </LanguageProvider>
    </ReduxProvider>
  );
};

// Theme-aware app component
const ThemedApp = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  
  // Initialize auth state on app load
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);
  
  // Generate theme with dark mode setting
  const themeWithMode = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: darkMode ? 'dark' : 'light',
    },
  });
  
  return (
    <ThemeProvider theme={themeWithMode}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default AppWrapper;
