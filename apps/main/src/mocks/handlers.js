import { http, HttpResponse } from 'msw';

// 定义请求处理程序数组
export const handlers = [
  // 示例API处理程序
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Admin User' },
      { id: 2, name: 'Regular User' },
    ]);
  }),
  
  // 登录处理程序
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    // 简单的身份验证检查
    if (email && password) {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: {
          id: 1,
          name: 'Admin User',
          email: email,
          roles: ['admin']
        }
      });
    }
    
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Unauthorized'
    });
  }),
]; 