/**
 * 模拟仪表盘数据
 */
export const dashboardData = {
  stats: {
    activeUsers: 1284,
    newUsers: 24,
    activeProjects: 42,
    tasks: {
      completed: 128,
      inProgress: 64,
      pending: 32,
    }
  },
  activities: [
    { id: 1, user: 'John Doe', action: 'Created a new project', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'Completed task #1234', time: '3 hours ago' },
    { id: 3, user: 'Robert Johnson', action: 'Updated user profile', time: '5 hours ago' },
    { id: 4, user: 'Emily Davis', action: 'Added new task', time: '1 day ago' },
    { id: 5, user: 'Michael Wilson', action: 'Approved request #5678', time: '1 day ago' },
  ],
  charts: {
    userGrowth: [
      { month: 'Jan', users: 650 },
      { month: 'Feb', users: 750 },
      { month: 'Mar', users: 830 },
      { month: 'Apr', users: 890 },
      { month: 'May', users: 950 },
      { month: 'Jun', users: 1050 },
      { month: 'Jul', users: 1150 },
      { month: 'Aug', users: 1250 },
      { month: 'Sep', users: 1284 },
    ],
    taskCompletion: {
      labels: ['完成', '进行中', '待处理'],
      data: [128, 64, 32],
      colors: ['#2e7d32', '#0070f3', '#ed6c02']
    }
  }
}; 