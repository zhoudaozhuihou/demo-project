import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/authSlice';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import EnvInfo from '../components/EnvInfo';

// Mock data for the dashboard
const mockStats = {
  activeUsers: 1284,
  newUsers: 24,
  activeProjects: 42,
  tasks: {
    completed: 128,
    inProgress: 64,
    pending: 32,
  },
  recentActivities: [
    { id: 1, user: 'John Doe', action: 'Created a new project', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Completed task #1234', time: '3 hours ago' },
    { id: 3, user: 'Robert Johnson', action: 'Updated user profile', time: '5 hours ago' },
    { id: 4, user: 'Emily Davis', action: 'Added new task', time: '1 day ago' },
    { id: 5, user: 'Michael Wilson', action: 'Approved request #5678', time: '1 day ago' },
  ],
};

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Calculate task percentages
  const totalTasks = stats.tasks.completed + stats.tasks.inProgress + stats.tasks.pending;
  const completedPercentage = Math.round((stats.tasks.completed / totalTasks) * 100);
  const inProgressPercentage = Math.round((stats.tasks.inProgress / totalTasks) * 100);
  const pendingPercentage = Math.round((stats.tasks.pending / totalTasks) * 100);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back, {user?.name || 'User'}!
      </Typography>
      
      {/* 环境信息组件 */}
      <EnvInfo />
      
      <Grid container spacing={3}>
        {/* Key Stats */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" color="text.secondary">
                  Active Users
                </Typography>
                <Typography variant="h3" sx={{ mt: 2, mb: 1, color: 'primary.main' }}>
                  {stats.activeUsers.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="success.main">
                  +{stats.newUsers} new today
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" color="text.secondary">
                  Active Projects
                </Typography>
                <Typography variant="h3" sx={{ mt: 2, mb: 1, color: 'secondary.main' }}>
                  {stats.activeProjects}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  across all departments
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" color="text.secondary">
                  Tasks Completed
                </Typography>
                <Typography variant="h3" sx={{ mt: 2, mb: 1, color: 'success.main' }}>
                  {stats.tasks.completed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  out of {totalTasks} total tasks
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Task Progress
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Completed Tasks ({stats.tasks.completed})
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={completedPercentage}
                    color="success"
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />
                  
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    In Progress Tasks ({stats.tasks.inProgress})
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={inProgressPercentage}
                    color="primary"
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />
                  
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Pending Tasks ({stats.tasks.pending})
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={pendingPercentage}
                    color="warning"
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Recent Activity" />
            <CardContent sx={{ pt: 0 }}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {stats.recentActivities.map((activity, index) => (
                  <Box key={activity.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={activity.user}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {activity.action}
                            </Typography>
                            {` — ${activity.time}`}
                          </>
                        }
                      />
                    </ListItem>
                    {index < stats.recentActivities.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 