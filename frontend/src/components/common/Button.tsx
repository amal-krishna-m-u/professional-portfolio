/**
 * Button Component
 * 
 * Reusable button with variants and states
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = 'font-mono font-semibold transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-accent-blue text-bg-dark border border-accent-blue hover:bg-transparent hover:text-accent-blue',
    secondary: 'bg-transparent text-accent-blue border border-accent-blue hover:bg-accent-blue hover:text-bg-dark',
    ghost: 'bg-transparent text-text-primary border border-transparent hover:border-accent-blue hover:text-accent-blue',
  };
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Hover effects
  const hoverStyles = !disabled && !isLoading ? 'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-blue/20' : '';
  
  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${hoverStyles} ${className}`;

  return (
    <button
      className={combinedStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin">⏳</span>
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
