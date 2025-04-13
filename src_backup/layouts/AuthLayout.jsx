import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/slices/authSlice';
import { Box, Paper, Container, Typography, useTheme } from '@mui/material';

/**
 * AuthLayout component for unauthenticated pages
 */
const AuthLayout = () => {
  const theme = useTheme();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="primary"
            gutterBottom
          >
            Enterprise App
          </Typography>
          
          {/* Auth content (Login, Register, etc.) */}
          <Outlet />
        </Paper>
      </Container>
      
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 5 }}
      >
        &copy; {new Date().getFullYear()} Enterprise App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default AuthLayout; 