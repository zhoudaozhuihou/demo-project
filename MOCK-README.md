# Mock服务和单元测试

本项目使用MSW(Mock Service Worker)提供模拟API服务，并使用Vitest作为测试框架。

## Mock服务

MSW通过拦截网络请求提供模拟API响应，无需修改应用代码即可工作。

### 目录结构

```
src/
└── mocks/
    ├── index.js           # 入口文件，导出初始化函数
    ├── browser.js         # 浏览器环境Worker配置
    ├── handlers.js        # API请求处理程序
    └── data/              # 模拟数据
        ├── users.js       # 用户数据
        └── dashboard.js   # 仪表盘数据
```

### 启用/禁用Mock服务

在环境配置文件中设置：

```
# 开发环境启用Mock服务
VITE_ENABLE_MOCKS=true
```

可以在不同环境配置中灵活控制是否启用Mock服务。

### 添加新的API模拟

在`src/mocks/handlers.js`中添加新的API处理程序：

```javascript
// 添加新的模拟API
http.get('/api/new-endpoint', async () => {
  await delay(300); // 模拟网络延迟
  return HttpResponse.json({
    data: 'This is mocked data'
  });
})
```

### 创建模拟数据

在`src/mocks/data/`目录下创建新的数据文件：

```javascript
// src/mocks/data/products.js
export const products = [
  { id: 1, name: 'Product 1', price: 99.99 },
  { id: 2, name: 'Product 2', price: 149.99 },
];
```

然后在处理程序中引用：

```javascript
import { products } from './data/products';

http.get('/api/products', () => {
  return HttpResponse.json(products);
})
```

## 单元测试

本项目使用Vitest作为测试框架，配合React Testing Library进行组件测试。

### 测试命令

```bash
# 运行所有测试
npm run test

# 监视模式
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage

# 启动UI界面
npm run test:ui
```

### 测试目录结构

测试文件与被测试的代码放在相同目录下的`__tests__`文件夹中：

```
src/
├── components/
│   ├── Button.jsx
│   └── __tests__/
│       └── Button.test.jsx
└── hooks/
    ├── useAuth.js
    └── __tests__/
        └── useAuth.test.js
```

### 编写组件测试

使用React Testing Library编写组件测试：

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button组件', () => {
  it('应该渲染按钮文本', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('点击时应该调用onClick处理程序', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 测试异步代码

使用Vitest的异步测试功能：

```javascript
it('应该异步加载数据', async () => {
  render(<DataLoader />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // 等待数据加载完成
  await screen.findByText('Data loaded');
  expect(screen.getByText('Item 1')).toBeInTheDocument();
});
```

### 模拟依赖

使用Vitest的模拟功能：

```javascript
import { describe, it, expect, vi } from 'vitest';

// 模拟模块
vi.mock('../api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ success: true }))
}));

// 测试代码
import { fetchData } from '../api';

it('应该调用API', async () => {
  await myFunction();
  expect(fetchData).toHaveBeenCalled();
});
```

### 测试Redux组件

使用React Testing Library的封装函数测试Redux组件：

```javascript
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import UserComponent from '../UserComponent';

const renderWithRedux = (ui, initialState) => {
  const store = configureStore(initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

it('应该显示用户名', () => {
  const { getByText } = renderWithRedux(<UserComponent />, {
    user: { data: { name: 'John' } }
  });
  expect(getByText('John')).toBeInTheDocument();
});
```

## 最佳实践

1. **专注于行为测试**：测试组件的行为而非实现细节
2. **避免过度模拟**：尽量使用真实依赖，只模拟必要的部分
3. **使用数据测试属性**：使用`data-testid`属性选择元素
4. **测试覆盖关键路径**：优先测试用户交互路径和业务逻辑
5. **保持简单**：每个测试专注于一个功能点
6. **运行测试驱动开发**：先写测试，再实现功能 