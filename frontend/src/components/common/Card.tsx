/**
 * Card Component
 * 
 * Glassmorphism card with hover effects
 */

import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  gradient?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = true,
  gradient = false,
  className = '',
  ...props
}: CardProps) {
  // Base styles with glassmorphism
  const baseStyles = 'glass-bg rounded-xl p-6 relative overflow-hidden';
  
  // Hover styles
  const hoverStyles = hover
    ? 'transition-all duration-300 hover:border-accent-blue hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-blue/20'
    : '';
  
  // Top gradient (appears on hover)
  const gradientStyles = gradient
    ? 'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-accent-blue before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300'
    : '';
  
  const combinedStyles = `${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`;

  return (
    <div className={combinedStyles} {...props}>
      {children}
    </div>
  );
}
