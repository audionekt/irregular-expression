import React from 'react';
import { cn } from '@repo/styles';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  as?: React.ElementType;
}

const variantClasses = {
  default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
  elevated: 'bg-white dark:bg-gray-900 shadow-lg',
  outlined: 'border-2 border-gray-200 dark:border-gray-800',
};

export function Card({ 
  variant = 'default', 
  hover = true,
  className,
  children,
  as = 'article',
  ...props
}: CardProps) {
  const Component = as;
  
  return (
    <Component
      className={cn(
        'p-6 rounded-lg transition-colors',
        variantClasses[variant],
        hover && 'hover:border-gray-300 dark:hover:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

