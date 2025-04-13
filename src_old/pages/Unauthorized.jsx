import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LockOutlined as LockIcon } from '@mui/icons-material';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        py: 8,
      }}
    >
      <Box
        sx={{
          backgroundColor: 'error.light',
          borderRadius: '50%',
          p: 2,
          mb: 3,
          color: 'white',
        }}
      >
        <LockIcon sx={{ fontSize: 60 }} />
      </Box>
      
      <Typography variant="h4" gutterBottom>
        Access Denied
      </Typography>
      
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4, maxWidth: 500 }}>
        You do not have permission to access this page. Please contact your administrator
        if you believe this is an error.
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate('/dashboard')}
      >
        Return to Dashboard
      </Button>
    </Box>
  );
};

export default Unauthorized; 