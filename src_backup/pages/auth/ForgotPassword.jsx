import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { LockReset as LockResetIcon } from '@mui/icons-material';
import API from '../../services/api';

const ForgotPassword = () => {
  // State
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form validation
  const [emailError, setEmailError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setError('');
      
      try {
        // Call password reset API
        await API.post('/auth/forgot-password', { email });
        setSuccess(true);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
        <LockResetIcon />
      </Avatar>
      
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      
      {success ? (
        <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Password reset instructions have been sent to your email.
          </Alert>
          <Link component={RouterLink} to="/login" variant="body2">
            Return to Login
          </Link>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter your email address below and we'll send you instructions to reset your password.
          </Typography>
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
          
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Remember your password? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword; 