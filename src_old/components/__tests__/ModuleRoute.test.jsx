import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ModuleRoute from '../ModuleRoute';

// 模拟组件
const TestComponent = () => <div data-testid="test-component">Test Component</div>;
const ModuleDisabledComponent = () => <div data-testid="module-disabled">Module Disabled</div>;

// 模拟useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('ModuleRoute', () => {
  it('应该渲染子组件当模块启用时', () => {
    render(
      <MemoryRouter>
        <ModuleRoute isEnabled={true} moduleName="Test Module">
          <TestComponent />
        </ModuleRoute>
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });
  
  it('应该重定向到模块禁用页面当模块禁用时', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path="/test" element={
            <ModuleRoute isEnabled={false} moduleName="Test Module">
              <TestComponent />
            </ModuleRoute>
          } />
          <Route path="/module-disabled" element={<ModuleDisabledComponent />} />
        </Routes>
      </MemoryRouter>
    );
    
    // 应该被重定向到模块禁用页面
    expect(screen.getByTestId('module-disabled')).toBeInTheDocument();
    // 原始组件不应该被渲染
    expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
  });
}); 