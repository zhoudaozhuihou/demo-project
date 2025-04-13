// MSW API handlers
import { http, HttpResponse, delay } from 'msw';
import { users } from './data/users';
import { dashboardData } from './data/dashboard';
import { products } from './data/products';

// 模拟JWT令牌
const createToken = (user) => {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    user: { ...user, password: undefined }
  };
  
  return btoa(JSON.stringify(payload));
};

// API请求处理程序
export const handlers = [
  // 登录API
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500);
    const { email, password } = await request.json();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ message: '无效的邮箱或密码' }), 
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const token = createToken(user);
    return new HttpResponse(
      JSON.stringify({
        token,
        refreshToken: 'refresh-token',
        user: { ...user, password: undefined }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
  
  // 用户列表API
  http.get('/api/users', async () => {
    await delay(300);
    return new HttpResponse(
      JSON.stringify(users.map(user => ({ ...user, password: undefined }))),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
  
  // 仪表盘数据API
  http.get('/api/dashboard', async () => {
    await delay(800);
    return new HttpResponse(
      JSON.stringify(dashboardData),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
  
  // 产品列表API - 修复API路径
  http.get('/api/products', async () => {
    await delay(300);
    return new HttpResponse(
      JSON.stringify(products),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
  
  // 产品详情API - 修复API路径
  http.get('/api/products/:id', async ({ params }) => {
    await delay(200);
    const product = products.find(p => p.id === Number(params.id));
    
    if (!product) {
      return new HttpResponse(
        JSON.stringify({ message: '未找到产品' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new HttpResponse(
      JSON.stringify(product),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  })
]; 