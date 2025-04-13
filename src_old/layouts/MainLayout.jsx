import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  AppBar as MuiAppBar,
  styled,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Grid,
  Select,
  FormControl,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  PeopleAlt as PeopleAltIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { selectCurrentUser, logout } from '../redux/slices/authSlice';
import { selectSidebarOpen, toggleSidebar, toggleDarkMode, selectDarkMode } from '../redux/slices/uiSlice';
import { useNavigate } from 'react-router-dom';

// Drawer width
const drawerWidth = 240;

// Styled components
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: 'auto',
}));

const MainLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector(selectSidebarOpen);
  const darkMode = useSelector(selectDarkMode);
  const user = useSelector(selectCurrentUser);
  const { t: tCore } = useTranslation('core');
  const { t: tSettings } = useTranslation('settings');
  const { currentLang, changeLanguage, languages } = useLanguage();
  
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };
  
  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  // Navigation items
  const navItems = [
    { text: tCore('nav.home'), icon: <HomeIcon />, path: '/' },
    { text: tCore('nav.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: tCore('nav.profile'), icon: <PersonIcon />, path: '/profile' },
    { text: tCore('nav.settings'), icon: <SettingsIcon />, path: '/settings' },
  ];

  // Admin-only navigation items
  const adminNavItems = [
    { text: tCore('nav.users'), icon: <PeopleAltIcon />, path: '/admin/users' },
  ];

  const isAdmin = user?.roles?.includes('admin');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Left side of top nav */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 4 }}>
              Enterprise App
            </Typography>
            
            <Button color="inherit" startIcon={<BusinessIcon />} sx={{ mr: 2 }}>
              {tCore('nav.team')}
            </Button>
            
            <Button color="inherit" startIcon={<AccountCircleIcon />}>
              {tCore('nav.account')}
            </Button>
          </Box>
          
          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />
          
          {/* Right side of top nav */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120, mr: 2 }}>
              <Select
                value={currentLang}
                onChange={handleLanguageChange}
                displayEmpty
                inputProps={{ 'aria-label': 'language' }}
                sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.23)' } }}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px' }}>{lang.flag}</span>
                      {lang.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <NotificationsIcon />
            </IconButton>
            
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user?.name || tCore('common.welcome')}
            </Typography>
            
            <IconButton 
              onClick={handleMenuOpen}
              sx={{ p: 0 }}
            >
              <Avatar alt={user?.name || 'User'} src={user?.avatar || ''} />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
            >
              <MenuItem onClick={() => navigate('/profile')}>{tCore('nav.profile')}</MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>{tCore('nav.settings')}</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>{tCore('nav.logout')}</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar / Drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            ...(open ? {
              overflowX: 'hidden',
              width: drawerWidth,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            } : {
              overflowX: 'hidden',
              width: theme.spacing(7),
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }),
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          
          {isAdmin && (
            <>
              <Divider />
              <List>
                {adminNavItems.map((item) => (
                  <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </List>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={tCore('nav.logout')} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          marginLeft: open ? `${drawerWidth}px` : `${theme.spacing(7)}px`,
          marginTop: '64px', // To offset the fixed AppBar
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
      
      {/* Footer */}
      <Footer>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Enterprise App
              </Typography>
              <Typography variant="body2" color="text.secondary">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button color="inherit" onClick={handleThemeToggle}>
                {darkMode ? tSettings('theme.light') : tSettings('theme.dark')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Footer>
    </Box>
  );
};

export default MainLayout; 