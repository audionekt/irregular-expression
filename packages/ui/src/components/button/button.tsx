import React from 'react';
import { cn } from '../../styles';
import * as styles from './button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  loading,
  icon,
  leftIcon,
  rightIcon,
  fullWidth,
  disabled,
  ...props 
}: ButtonProps) {
  // If 'icon' is provided, use it as leftIcon for simplicity
  const finalLeftIcon = icon || leftIcon;
  
  return (
    <button 
      className={cn(
        styles.button,
        styles.variants[variant],
        styles.sizes[size],
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className={styles.loadingSpinner}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {finalLeftIcon && (
            <span className={styles.iconWrapper}>{finalLeftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className={styles.iconWrapper}>{rightIcon}</span>
          )}
        </>
      )}
    </button>
  );
}
