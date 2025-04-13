import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EnvInfo from '../EnvInfo';

// 模拟config模块
vi.mock('../../config/env', () => ({
  default: {
    app: {
      name: 'Test App',
      version: '1.0.0',
      env: 'test',
      debug: true,
    },
    api: {
      url: 'https://test-api.example.com',
    },
    features: {
      newUserInterface: true,
      betaFeatures: false,
      analytics: true,
    },
    isDev: false,
    isTest: true,
    isProd: false,
  },
}));

describe('EnvInfo', () => {
  it('应该正确显示环境信息', () => {
    render(<EnvInfo />);
    
    // 检查标题
    expect(screen.getByText('环境信息')).toBeInTheDocument();
    
    // 检查应用信息
    expect(screen.getByText(/名称: Test App/)).toBeInTheDocument();
    expect(screen.getByText(/版本: 1.0.0/)).toBeInTheDocument();
    expect(screen.getByText(/环境:/)).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText(/调试模式: 开启/)).toBeInTheDocument();
    
    // 检查API信息
    expect(screen.getByText(/API地址:/)).toBeInTheDocument();
    expect(screen.getByText('https://test-api.example.com')).toBeInTheDocument();
    
    // 检查功能特性
    expect(screen.getByText('新UI界面')).toBeInTheDocument();
    expect(screen.getByText('Beta功能')).toBeInTheDocument();
    expect(screen.getByText('数据分析')).toBeInTheDocument();
    
    // 检查环境类型
    expect(screen.getByText('开发环境')).toBeInTheDocument();
    expect(screen.getByText('测试环境')).toBeInTheDocument();
    expect(screen.getByText('生产环境')).toBeInTheDocument();
  });
}); 