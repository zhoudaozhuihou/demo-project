import React from 'react';
import { Button as MuiButton } from '@mui/material';

/**
 * 自定义按钮组件，基于 MUI Button 封装
 */
export const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  fullWidth = false,
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button; 