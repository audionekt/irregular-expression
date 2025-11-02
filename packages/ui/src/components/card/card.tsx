import React from 'react';
import { cn } from '../../styles';
import * as styles from './card.css';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  as?: React.ElementType;
}

export function Card({ 
  variant = 'default', 
  padding = 'md',
  interactive = false,
  className,
  children,
  as = 'article',
  ...props
}: CardProps) {
  const Component = as;
  
  return (
    <Component
      className={cn(
        styles.card,
        styles.variants[variant],
        styles.padding[padding],
        interactive && styles.interactive,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
