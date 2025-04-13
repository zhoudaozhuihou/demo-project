import { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import { selectCurrentUser } from '../redux/slices/authSlice';

const Profile = () => {
  const user = useSelector(selectCurrentUser) || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    role: 'Administrator',
    department: 'IT',
    joinDate: '2022-01-15',
  };
  
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    department: user.department,
    phone: '123-456-7890',
    bio: 'Experienced IT professional with a focus on enterprise solutions and cloud infrastructure.',
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Update profile logic would go here
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {user.role} • {user.department}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {new Date(user.joinDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ width: '100%' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
            <Tab label="Personal Information" />
            <Tab label="Security" />
            <Tab label="Preferences" />
          </Tabs>
          
          {/* Personal Information Tab */}
          {tabValue === 0 && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Security Tab */}
          {tabValue === 1 && (
            <Box sx={{ mt: 3, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <Typography variant="body1" paragraph>
                Manage your security settings and password here.
              </Typography>
              {/* Security settings would go here */}
            </Box>
          )}
          
          {/* Preferences Tab */}
          {tabValue === 2 && (
            <Box sx={{ mt: 3, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                User Preferences
              </Typography>
              <Typography variant="body1" paragraph>
                Customize your user experience preferences.
              </Typography>
              {/* Preference settings would go here */}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile; 