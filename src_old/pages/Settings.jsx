import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Visibility as VisibilityIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  SaveAlt as SaveIcon,
} from '@mui/icons-material';
import { toggleDarkMode, selectDarkMode } from '../redux/slices/uiSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      desktop: false,
    },
    language: 'en',
    privacy: {
      profileVisibility: 'public',
      activityLog: true,
    },
    security: {
      twoFactor: false,
    },
  });
  
  const [saveStatus, setSaveStatus] = useState(null);
  
  const handleToggleChange = (section, setting) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: !settings[section][setting],
      },
    });
  };
  
  const handleSelectChange = (section, setting, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: value,
      },
    });
  };
  
  const handleSaveSettings = () => {
    // Here you would normally save settings to the server
    console.log('Saving settings:', settings);
    
    // Show success message
    setSaveStatus('success');
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {saveStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <List component="nav" aria-label="settings sections">
              <ListItem button>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Language" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Privacy" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Appearance" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive notifications via email" 
                />
                <Switch
                  edge="end"
                  checked={settings.notifications.email}
                  onChange={() => handleToggleChange('notifications', 'email')}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Push Notifications" 
                  secondary="Receive push notifications on your mobile device" 
                />
                <Switch
                  edge="end"
                  checked={settings.notifications.push}
                  onChange={() => handleToggleChange('notifications', 'push')}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Desktop Notifications" 
                  secondary="Show notifications on your desktop" 
                />
                <Switch
                  edge="end"
                  checked={settings.notifications.desktop}
                  onChange={() => handleToggleChange('notifications', 'desktop')}
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Language and Region
            </Typography>
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="language-select-label">Language</InputLabel>
                <Select
                  labelId="language-select-label"
                  id="language-select"
                  value={settings.language}
                  label="Language"
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="zh">中文</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Appearance
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Dark Mode" 
                  secondary="Use dark theme throughout the application" 
                />
                <Switch
                  edge="end"
                  checked={darkMode}
                  onChange={() => dispatch(toggleDarkMode())}
                />
              </ListItem>
            </List>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 