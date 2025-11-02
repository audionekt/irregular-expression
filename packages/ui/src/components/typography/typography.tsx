import React from 'react';
import { cn } from '../../styles';
import * as styles from './typography.css';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'caption' | 'small';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  align?: 'left' | 'center' | 'right' | 'justify';
  as?: React.ElementType;
}

const defaultElements = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  caption: 'span',
  small: 'small',
} as const;

export function Typography({
  variant = 'p',
  weight,
  align,
  className,
  children,
  as,
  ...props
}: TypographyProps) {
  const Component = as || defaultElements[variant];

  return (
    <Component
      className={cn(
        styles.typography,
        styles.variants[variant],
        weight && styles.weights[weight],
        align && styles.aligns[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
